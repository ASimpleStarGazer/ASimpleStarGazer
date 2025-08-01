from typing import Any
import httpx
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("ASimpleStarGazer")

NWS_API_BASE = "https://api.weather.gov"
USER_AGENT = "weather-app/1.0"