[McpServerToolType]
public static class MoonTools
{
    [McpServerTool(Name = "get_moon_phase")]
    public static async Task<string> GetMoonPhase(
        string lat, string lon, string date, IHttpClientFactory httpFactory, CancellationToken ct)
    {
        var auth = Environment.GetEnvironmentVariable("AstronomyAPI_key");
        if (string.IsNullOrWhiteSpace(auth))
            return JsonErr("AstronomyAPI_key not found in environment variables");

        if (!DateOnly.TryParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out _))
            return JsonErr("Date must be in YYYY-MM-DD format");

        var payload = new JsonObject
        {
            ["style"] = new JsonObject {
                ["moonStyle"]="default", ["backgroundStyle"]="stars",
                ["backgroundColor"]="#000000", ["headingColor"]="#ffffff", ["textColor"]="#ffffff"
            },
            ["observer"] = new JsonObject { ["latitude"]=lat, ["longitude"]=lon, ["date"]=date },
            ["view"] = new JsonObject { ["type"]="portrait-simple", ["parameters"]=new JsonObject() }
        };

        var req = new HttpRequestMessage(HttpMethod.Post, "https://api.astronomyapi.com/api/v2/studio/moon-phase")
        {
            Content = new StringContent(payload.ToJsonString(), Encoding.UTF8, "application/json")
        };
        req.Headers.Authorization = new AuthenticationHeaderValue("Basic", auth);

        var http = httpFactory.CreateClient();
        using var resp = await http.SendAsync(req, ct);
        var body = await resp.Content.ReadAsStringAsync(ct);
        if (!resp.IsSuccessStatusCode) return JsonErr($"HTTP {(int)resp.StatusCode}: {Truncate(body, 500)}");

        try
        {
            using var doc = JsonDocument.Parse(body);
            var data = doc.RootElement.GetProperty("data");
            var result = new {
                moon_phase  = data.TryGetProperty("moonPhase", out var p) ? p.ToString() : "Unknown",
                illumination= data.TryGetProperty("illumination", out var i) ? i.ToString() : "Unknown",
                age        = data.TryGetProperty("age", out var a) ? a.ToString() : "Unknown"
            };
            return JsonSerializer.Serialize(result);
        }
        catch (Exception e) { return JsonErr($"Error decoding JSON response from AstronomyAPI: {e.Message}"); }
    }

    private static string JsonErr(string m) => JsonSerializer.Serialize(new { error = m });
    private static string Truncate(string s, int max) => string.IsNullOrEmpty(s) ? s : (s.Length <= max ? s : s[..max] + "…");
}