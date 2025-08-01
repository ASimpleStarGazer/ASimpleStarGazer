import os
import json
from typing import Any
import httpx
import dotenv
from mcp.server.fastmcp import FastMCP
from module.weather_model import Weather_model

dotenv.load_dotenv()
# ASimpleStarGazer.py
mcp = FastMCP("ASimpleStarGazer")
Meteosource_API_Base = "https://api.meteosource.com/v1/forecast/point"


async def make_meteosource_request(url: str) -> dict[str, Any] | None:
    """Make a request to the Meteosource API with proper error handling."""
    headers = {
        "User-Agent": "ASimpleStarGazer/1.0",
        "Accept": "application/geo+json"
    }
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers, timeout=30)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            error_msg = f"HTTP error {e.response.status_code}: {e.response.text}"
            print(error_msg)
            return None
        except httpx.RequestError as e:
            error_msg = f"Request failed: {e}"
            print(error_msg)
            return None
        except Exception as e:
            error_msg = f"Unexpected error: {e}"
            print(error_msg)
            return None

@mcp.tool("get_weather")
async def get_weather(lat: str,lon: str) -> str:
    """
    Get weather information for a specific location.

    Args:
        lat: The latitude of the location.
        lon: The longitude of the location.

    """
    weather_model = Weather_model(lat=lat,lon=lon,key=os.environ.get("Meteosource_Api_Key"))
    points_url = f"{Meteosource_API_Base}?lat={weather_model.lat}&lon={weather_model.lon}&sections={weather_model.sections}&timezone={weather_model.timezone}&language={weather_model.language}&units={weather_model.units}&key={weather_model.key}"   
    result = await make_meteosource_request(points_url)
    if result is None:
        return "Failed to fetch weather data" 
    return json.dumps(result)


if __name__ == "__main__":
    mcp.run("stdio")