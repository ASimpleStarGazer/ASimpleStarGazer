[McpServerToolType]
public static class WeatherTools
{
    private const string BaseUrl = "https://www.meteosource.com/api/v1/free/point";

    [McpServerTool(Name = "get_weather")]
    public static async Task<string> GetWeather(
        string lat, string lon, IHttpClientFactory httpFactory, CancellationToken ct)
    {
        var apiKey = Environment.GetEnvironmentVariable("Meteosource_Api_Key");
        if (string.IsNullOrWhiteSpace(apiKey))
            return JsonErr("Meteosource_Api_Key not found in environment variables");

        if (!TryParseLatLon(lat, lon, out var la, out var lo, out var msg))
            return JsonErr(msg);

        var url = $"{BaseUrl}?lat={la.ToString(CultureInfo.InvariantCulture)}&lon={lo.ToString(CultureInfo.InvariantCulture)}" +
                  "&sections=all&timezone=auto&language=en&units=metric&key=" + Uri.EscapeDataString(apiKey);

        var http = httpFactory.CreateClient();
        http.DefaultRequestHeaders.UserAgent.ParseAdd("ASimpleStarGazer/1.0");
        http.DefaultRequestHeaders.Accept.ParseAdd("application/geo+json");

        try
        {
            using var resp = await http.GetAsync(url, ct);
            var body = await resp.Content.ReadAsStringAsync(ct);
            return resp.IsSuccessStatusCode ? body : JsonErr($"HTTP {(int)resp.StatusCode}: {Truncate(body, 500)}");
        }
        catch (TaskCanceledException) { return JsonErr("Request timeout"); }
        catch (Exception e)          { return JsonErr($"Unexpected error in get_weather: {e.Message}"); }
    }

    private static bool TryParseLatLon(string lat, string lon, out double la, out double lo, out string err)
    {
        err = ""; 
        la = 0; 
        lo = 0;
        if (!double.TryParse(lat, NumberStyles.Float, CultureInfo.InvariantCulture, out la) ||
            !double.TryParse(lon, NumberStyles.Float, CultureInfo.InvariantCulture, out lo))
            { err = "Invalid latitude or longitude format"; return false; }
        if (la is < -90 or > 90)   { err = "Latitude must be between -90 and 90 degrees"; return false; }
        if (lo is < -180 or > 180) { err = "Longitude must be between -180 and 180 degrees"; return false; }
        return true;
    }
    private static string JsonErr(string m) => JsonSerializer.Serialize(new { error = m });
    private static string Truncate(string s, int max) => string.IsNullOrEmpty(s) ? s : (s.Length <= max ? s : s[..max] + "…");
}