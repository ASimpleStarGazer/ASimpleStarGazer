import http
import os
import json
from typing import Any
import httpx
import dotenv
from mcp.server.fastmcp import FastMCP
from models.weather_model import Weather_model
import redis.asyncio as redis
import aiomysql

dotenv.load_dotenv()
# ASimpleStarGazer.py
mcp = FastMCP("ASimpleStarGazer")
Meteosource_API_Base = "https://www.meteosource.com/api/v1/free/point"

# get moon phase
AstronomyAPI_key = os.environ.get("AstronomyAPI_key")

# Redis/MySQL shared clients
redis_client: redis.Redis | None = None
mysql_pool: aiomysql.Pool | None = None

async def init_connections():
    """Initialize Redis client and MySQL pool if not already created."""
    global redis_client, mysql_pool
    if redis_client is None:
        redis_url = os.environ.get("REDIS_URL", "redis://localhost:6379/0")
        redis_client = redis.from_url(redis_url, decode_responses=True)
        # simple ping to validate connection
        await redis_client.ping()
    if mysql_pool is None:
        mysql_pool = await aiomysql.create_pool(
            host=os.environ.get("MYSQL_HOST", "localhost"),
            port=int(os.environ.get("MYSQL_PORT", "3306")),
            db=os.environ.get("MYSQL_DB", "stargazer"),
            user=os.environ.get("MYSQL_USER", "sg"),
            password=os.environ.get("MYSQL_PASSWORD", "sgpass"),
            minsize=1,
            maxsize=5,
            autocommit=True,
        )

async def get_moon_phase(lat: str, lon: str, date: str) -> str | dict:
    """Get moon phase data from AstronomyAPI with comprehensive error handling."""
    try:
        # Validate API key
        if not AstronomyAPI_key:
            return "Error: AstronomyAPI_key not found in environment variables"
        
        # Validate input parameters
        try:
            lat_float = float(lat)
            lon_float = float(lon)
            if not (-90 <= lat_float <= 90):
                return "Error: Latitude must be between -90 and 90 degrees"
            if not (-180 <= lon_float <= 180):
                return "Error: Longitude must be between -180 and 180 degrees"
        except ValueError:
            return "Error: Invalid latitude or longitude format"
        
        # Validate date format (basic check)
        if not date or len(date) != 10 or date.count('-') != 2:
            return "Error: Date must be in YYYY-MM-DD format"
        
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
        
        try:
            AstronomyAPI_connection.request("POST", url, body=json.dumps(payload), headers=headers)
            response = AstronomyAPI_connection.getresponse()
            data = response.read()
            
            if response.status != 200:
                error_detail = data.decode('utf-8') if data else "No error details available"
                return f"Error: HTTP {response.status} - {error_detail}"
            
            try:
                moon_phase_data = json.loads(data.decode('utf-8'))
                
                # Check if the response contains the expected data structure
                if "data" not in moon_phase_data:
                    return "Error: Invalid response format from AstronomyAPI"
                
                return {
                    "moon_phase": moon_phase_data.get("data", {}).get("moonPhase", "Unknown"),
                    "illumination": moon_phase_data.get("data", {}).get("illumination", "Unknown"),
                    "age": moon_phase_data.get("data", {}).get("age", "Unknown")
                }
            except json.JSONDecodeError as e:
                return f"Error decoding JSON response from AstronomyAPI: {str(e)}"
            except UnicodeDecodeError as e:
                return f"Error decoding response data: {str(e)}"
                
        except http.client.HTTPException as e:
            return f"HTTP connection error: {str(e)}"
        except ConnectionError as e:
            return f"Connection error: {str(e)}"
        except TimeoutError as e:
            return f"Request timeout: {str(e)}"
        finally:
            try:
                AstronomyAPI_connection.close()
            except:
                pass  # Ignore errors when closing connection
                
    except Exception as e:
        return f"Unexpected error in get_moon_phase: {str(e)}"
    

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
async def get_weather(lat: str, lon: str) -> str:
    """
    Get weather information for a specific location.

    Args:
        lat: The latitude of the location.
        lon: The longitude of the location.

    """
    try:
        # Validate API key
        api_key = os.environ.get("Meteosource_Api_Key")
        if not api_key:
            return json.dumps({"error": "Meteosource_Api_Key not found in environment variables"})
        
        # Validate input parameters
        try:
            lat_float = float(lat)
            lon_float = float(lon)
            if not (-90 <= lat_float <= 90):
                return json.dumps({"error": "Latitude must be between -90 and 90 degrees"})
            if not (-180 <= lon_float <= 180):
                return json.dumps({"error": "Longitude must be between -180 and 180 degrees"})
        except ValueError:
            return json.dumps({"error": "Invalid latitude or longitude format"})
        
        # Create weather model and make request
        weather_model = Weather_model(lat=lat, lon=lon, key=api_key)
        points_url = f"{Meteosource_API_Base}?lat={weather_model.lat}&lon={weather_model.lon}&sections={weather_model.sections}&timezone={weather_model.timezone}&language={weather_model.language}&units={weather_model.units}&key={weather_model.key}"   
        
        result = await make_meteosource_request(points_url)
        if result is None:
            return json.dumps({"error": "Failed to fetch weather data from Meteosource API"})
        
        return json.dumps(result)
        
    except Exception as e:
        return json.dumps({"error": f"Unexpected error in get_weather: {str(e)}"})


@mcp.tool("get_moon_phase")
async def get_moon_phase_tool(lat: str, lon: str, date: str) -> str:
    """
    Get the moon phase for a specific date and location.

    Args:
        lat: The latitude of the location.
        lon: The longitude of the location.
        date: The date in ISO format (YYYY-MM-DD).

    """
    try:
        moon_phase = await get_moon_phase(lat, lon, date)
        
        # If the result is a string, it's an error message
        if isinstance(moon_phase, str):
            return json.dumps({"error": moon_phase})
        
        # If it's a dict, it's successful data
        return json.dumps(moon_phase)
        
    except Exception as e:
        return json.dumps({"error": f"Unexpected error in get_moon_phase_tool: {str(e)}"})

@mcp.tool("cache_set")
async def cache_set(key: str, value: str, ttl_seconds: int = 300) -> str:
    """Set a value into Redis with optional TTL."""
    try:
        await init_connections()
        assert redis_client is not None
        await redis_client.set(key, value, ex=ttl_seconds)
        return json.dumps({"ok": True})
    except Exception as e:
        return json.dumps({"error": f"cache_set failed: {str(e)}"})

@mcp.tool("db_ping")
async def db_ping() -> str:
    """Ping MySQL by running SELECT 1."""
    try:
        await init_connections()
        assert mysql_pool is not None
        async with mysql_pool.acquire() as conn:
            async with conn.cursor() as cur:
                await cur.execute("SELECT 1")
                row = await cur.fetchone()
        return json.dumps({"result": row[0] == 1})
    except Exception as e:
        return json.dumps({"error": f"db_ping failed: {str(e)}"})





if __name__ == "__main__":
    mcp.run("stdio")