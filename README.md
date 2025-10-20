# ASimpleStarGazer 🌟

ASimpleStarGazer is a stargazing application based on MCP (Model Context Protocol), providing multi-language MCP server implementations for weather, moon phases, planetary positions, and other astronomical information.

## Project Architecture

This project uses a microservices architecture with Git Submodules to manage multiple sub-repositories:

### Frontend Applications
- **ASimpleStargGazer_frontend** - Main React frontend application

### MCP Servers (MCP_servers/)
- **ASimpleStargGazer_python** - Python MCP server (FastAPI + Redis + MySQL)
- **ASimpleStargGazer_dotnet** - .NET 8 MCP server (Entity Framework + MySQL)
- **ASimpleStargGazer_node** - Node.js TypeScript MCP server

### Infrastructure
- **ASimpleStargGazer_Infra** - Terraform and GitOps configurations
- **docs/** - Project documentation and PRD
- **docker-compose.yml** - Local development environment configuration

## Quick Start

### 1. Clone the project (including submodules)
```powershell
git clone --recursive https://github.com/Ruixiaoke/ASimpleStargGazer.git
cd ASimpleStarGazer
```

### 2. Start infrastructure services (Redis + MySQL)
```powershell
docker compose up -d
```

## MCP Servers

### Python Server (Recommended)
```powershell
# Navigate to Python MCP server directory
cd MCP_servers/ASimpleStargGazer_python

# Install dependencies
pip install -r requirements.txt

# Configure environment variables (create .env file)
# AstronomyAPI_key=your_key
# Meteosource_Api_Key=your_key
# REDIS_URL=redis://localhost:6379/0
# MYSQL_HOST=localhost
# ...

# Start the service
python ASimpleStarGazer.py

# Test with MCP Inspector
npx @modelcontextprotocol/inspector
# Then connect to: python MCP_servers/ASimpleStargGazer_python/ASimpleStarGazer.py
```

### .NET Server
```powershell
# Navigate to .NET MCP server directory
cd MCP_servers/ASimpleStargGazer_dotnet

# Database migration
dotnet ef migrations add InitialCreate \
  -p ASimpleStarGazer.Model/ASimpleStarGazer.Model.csproj \
  -s ASimpleStarGazer_dotNet/ASimpleStarGazer_dotNet.csproj

dotnet ef database update \
  -p ASimpleStarGazer.Model/ASimpleStarGazer.Model.csproj \
  -s ASimpleStarGazer_dotNet/ASimpleStarGazer_dotNet.csproj

# Build project
dotnet build ASimpleStarGazer_dotNet/ASimpleStarGazer_dotNet.csproj -c Debug

# Start the service
dotnet run --no-build --project ASimpleStarGazer_dotNet/ASimpleStarGazer_dotNet.csproj

# Test with MCP Inspector
npx @modelcontextprotocol/inspector
# Then connect to: dotnet run --no-build --project MCP_servers/ASimpleStargGazer_dotnet/ASimpleStarGazer_dotNet/ASimpleStarGazer_dotNet.csproj
```

### Node.js Server
```powershell
# Navigate to Node.js MCP server directory
cd MCP_servers/ASimpleStargGazer_node

# Install dependencies
npm install

# Build project
npm run build

# Start the service
node build/index.js

# Test with MCP Inspector
npx @modelcontextprotocol/inspector
# Then connect to: node MCP_servers/ASimpleStargGazer_node/build/index.js
```

## Frontend Applications

### Main Frontend Application (ASimpleStargGazer_frontend)
```powershell
cd ASimpleStargGazer_frontend
npm install
npm run dev
```

## Available MCP Tools

All MCP servers provide the following unified tool interfaces:

- `get_weather(location)` - Get weather information
- `get_light_pollution(location)` - Get light pollution data
- `get_moon_phase(location)` - Get moon phase information
- `get_planet_positions(location)` - Get planetary positions
- `get_cloud_data(location)` - Get cloud cover data
- `cache_set/cache_get` - Redis cache operations (Python/C#)
- `db_ping` - Database connection test (Python/C#)

## Development Requirements

- **Python**: 3.10+
- **Node.js**: 18+
- **.NET**: 8.0+
- **Docker**: 20+
- **Redis**: 7+
- **MySQL**: 8+

## Project Structure
```
├── ASimpleStargGazer_frontend/    # Main frontend application (React)
├── ASimpleStargGazer_Infra/       # Infrastructure configuration (Terraform)
├── MCP_servers/                   # MCP server collection
│   ├── ASimpleStargGazer_python/  # Python MCP server
│   ├── ASimpleStargGazer_dotnet/  # .NET MCP server
│   └── ASimpleStargGazer_node/    # Node.js MCP server
├── docs/                          # Project documentation
├── docker-compose.yml             # Local development environment
└── README.md                      # This file
```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

### Workflows

- **CI Pipeline** (`.github/workflows/ci.yml`) - Runs on every push and pull request
  - Multi-language testing (Python, .NET, Node.js)
  - Frontend application builds
  - Infrastructure validation
  - Security scanning
  - Integration testing

- **Pull Request Workflow** (`.github/workflows/pr.yml`) - Enhanced PR validation
  - Code quality checks (linting, formatting, type checking)
  - Test coverage reporting
  - Security vulnerability scanning
  - Performance benchmarks (when labeled)
  - Auto-reviewer assignment

- **Deployment Pipeline** (`.github/workflows/deploy.yml`) - Automated deployments
  - Docker image building and publishing
  - Staging deployment (on main branch)
  - Production deployment (on version tags)
  - Smoke testing

- **Maintenance Workflow** (`.github/workflows/maintenance.yml`) - Automated maintenance
  - Daily dependency updates
  - Security scanning
  - Dead link checking
  - Cleanup of old artifacts
  - Project metrics reporting

### CI Features

- **Smart Change Detection** - Only runs relevant jobs based on file changes
- **Parallel Execution** - Multiple jobs run simultaneously for faster feedback
- **Caching** - Dependencies are cached to speed up builds
- **Matrix Builds** - Tests across multiple environments
- **Security First** - Integrated vulnerability scanning and dependency auditing

### Development Workflow

1. **Fork and Clone** with submodules:
   ```bash
   git clone --recursive https://github.com/your-username/ASimpleStarGazer.git
   ```

2. **Create Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes** - The CI will validate your changes automatically

4. **Submit Pull Request** - Auto-reviewers will be assigned

5. **Merge** - Automatic deployment to staging on merge to main

### Badge Status

![CI](https://github.com/Ruixiaoke/ASimpleStarGazer/workflows/CI/badge.svg)
![Deploy](https://github.com/Ruixiaoke/ASimpleStarGazer/workflows/Deploy/badge.svg)
![Security](https://github.com/Ruixiaoke/ASimpleStarGazer/workflows/Maintenance/badge.svg)

## License

# Copyright (C) 2025 [Your Name or Organization]

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.