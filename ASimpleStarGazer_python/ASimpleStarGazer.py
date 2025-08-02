import http
import os
import json
from typing import Any
import httpx
import dotenv
from mcp.server.fastmcp import FastMCP
from models.weather_model import Weather_model

dotenv.load_dotenv()
# ASimpleStarGazer.py
mcp = FastMCP("ASimpleStarGazer")
Meteosource_API_Base = "https://www.meteosource.com/api/v1/free/point"

# get moon phase
AstronomyAPI_key = os.environ.get("AstronomyAPI_key")

async def get_moon_phase(lat: str, lon: str, date: str) -> str:
    AstronomyAPI_connection = http.client.HTTPSConnection("api.astronomyapi.com")
    url = "/api/v2/studio/moon-phase"
    headers = { 'Authorization': f"Basic {AstronomyAPI_key}" }
    payload = {
        "style": {
            "moonStyle": "default",         
            "backgroundStyle": "stars",  
            "backgroundColor": "#000000",   
            "headingColor": "#ffffff",      
            "textColor": "#ffffff"          
        },
        "observer": {
            "latitude": lat,          
            "longitude": lon,        
            "date": date,        
        },
        "view": {
            "type": "portrait-simple",      
            "parameters": {}                
        }
    }
    AstronomyAPI_connection.request("POST", url, body=json.dumps(payload), headers=headers)
    response = AstronomyAPI_connection.getresponse()
    data = response.read()
    if response.status != 200:
        return f"Error: {response.status} - {data.decode('utf-8')}"
    try:
        moon_phase_data = json.loads(data.decode('utf-8'))
        return {
            "moon_phase": moon_phase_data.get("data", {}).get("moonPhase", "Unknown"),
            "illumination": moon_phase_data.get("data", {}).get("illumination", "Unknown"),
            "age": moon_phase_data.get("data", {}).get("age", "Unknown")
        }
    except json.JSONDecodeError:
        return "Error decoding JSON response from AstronomyAPI"
    

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


@mcp.tool("get_moon_phase")
async def get_moon_phase_tool(lat: str, lon: str, date: str) -> str:
    """
    Get the moon phase for a specific date and location.

    Args:
        lat: The latitude of the location.
        lon: The longitude of the location.
        date: The date in ISO format (YYYY-MM-DD).

    """
    moon_phase = await get_moon_phase(lat, lon, date)
    if isinstance(moon_phase, str):
        return moon_phase
    return json.dumps(moon_phase)






if __name__ == "__main__":
    mcp.run("stdio")