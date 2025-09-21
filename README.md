# FastAPI
## Install uv (Mac)
curl -LsSf https://astral.sh/uv/install.sh | sh
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zprofile
source ~/.zshrc
hash -r

## Virtual Environment
cd apps/server-python/ASimpleStarGazer_python
uv sync
source .venv/bin/activate

## MCP UI
npx @modelcontextprotocol/inspector
uv
run apps/server-python/ASimpleStarGazer_python/ASimpleStarGazer.py --active

# .NET
## Data Migration
dotnet ef migrations add InitialCreate \
  -p apps/server-dotnet/ASimpleStarGazer.Model/ASimpleStarGazer.Model.csproj \
  -s apps/server-dotnet/ASimpleStarGazer_dotNet/ASimpleStarGazer_dotNet.csproj

dotnet ef database update \
  -p apps/server-dotnet/ASimpleStarGazer.Model/ASimpleStarGazer.Model.csproj \
  -s apps/server-dotnet/ASimpleStarGazer_dotNet/ASimpleStarGazer_dotNet.csproj

## Build
dotnet build apps/server-dotnet/ASimpleStarGazer_dotNet/ASimpleStarGazer_dotNet.csproj -c Debug

## MCP UI
npx @modelcontextprotocol/inspector
dotnet
run --no-build --project apps/server-dotnet/ASimpleStarGazer_dotNet/ASimpleStarGazer_dotNet.csproj --method tools/list

# Copyright (C) 2025 [Your Name or Organization]

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.