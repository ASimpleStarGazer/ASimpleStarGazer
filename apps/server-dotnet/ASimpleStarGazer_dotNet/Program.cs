using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using ModelContextProtocol.Server;
using StackExchange.Redis;
using MySqlConnector;
using ASimpleStarGazer.Model.DBContext;

namespace ASimpleStarGazer_dotNet
{
    public class Program {
        public static async Task Main(string[] args) {
            var builder = Host.CreateApplicationBuilder(args);

            builder.Configuration.SetBasePath(AppContext.BaseDirectory)
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddEnvironmentVariables();

            builder.Logging
            .AddConfiguration(builder.Configuration.GetSection("Logging"))
            .AddConsole(o => o.LogToStandardErrorThreshold = LogLevel.Trace);

            var dbSection = builder.Configuration.GetSection("DataBase");
            var dbType    = (dbSection["Type"] ?? "Mysql").Trim().ToLowerInvariant();
            var connStr   = dbSection["ConnectionString"];
            var dataSeed  = dbSection.GetValue<bool?>("DataSeed") ?? false;

            builder.Services.AddDbContext<ASimpleStarGazerDBContext>(options =>
            {
                switch (dbType)
                {
                    case "mysql":
                    case "mariadb":
                        options.UseMySql(connStr, ServerVersion.AutoDetect(connStr));
                        break;
                    default:
                        throw new InvalidOperationException($"Unsupported DataBase:Type '{dbType}'.");
                }
            });

            var cacheSection = builder.Configuration.GetSection("Caching");
            var useRedis     = cacheSection.GetValue<bool?>("UseRedis") ?? false;
            var redisConfig  = cacheSection["Configuration"] ?? "localhost:6379";
            var instanceName = cacheSection["InstanceName"] ?? "sgredis";

            if (useRedis)
            {
                builder.Services.AddSingleton<IConnectionMultiplexer>(_ =>
                    ConnectionMultiplexer.Connect(redisConfig));

                // If you like to DI an IDatabase per-scope:
                builder.Services.AddScoped(sp =>
                {
                    var mux = sp.GetRequiredService<IConnectionMultiplexer>();
                    return mux.GetDatabase(); // respects default DB in connection string
                });
            }

            builder.Services.AddHttpClient().AddMcpServer()
            .WithStdioServerTransport()
            .WithToolsFromAssembly();

            builder.Services.AddSingleton(_ =>
            {
                var client = new HttpClient() { BaseAddress = new Uri("https://api.weather.gov") };
                client.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("weather-tool", "1.0"));
                return client;
            });

            var app = builder.Build();

            if (dataSeed)
            {
                using var scope = app.Services.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<ASimpleStarGazerDBContext>();
                await db.Database.EnsureCreatedAsync();
            }

            await app.RunAsync();
        }
    }
}