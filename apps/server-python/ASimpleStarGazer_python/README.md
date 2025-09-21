# ASimpleStarGazer Python 服务

## 概述
本服务通过 MCP 暴露天气与月相查询工具，并集成了 Redis 缓存与 MySQL 数据库连接。

## 运行环境
- Python 3.10+
- Redis 7+
- MySQL 8+
- Windows PowerShell / Bash

## 安装依赖
```powershell
cd apps/server-python/ASimpleStarGazer_python
pip install -r requirements.txt
```

确保 `requirements.txt` 包含：
- redis>=5.0.0
- aiomysql>=0.2.0
- httpx, python-dotenv 等

## 环境变量
推荐使用 `.env`（同目录下）：
```
# 外部 API
AstronomyAPI_key=

# Meteosource
Meteosource_Api_Key=

# Redis
REDIS_URL=redis://localhost:6379/0

# MySQL
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB=stargazer
MYSQL_USER=sg
MYSQL_PASSWORD=sgpass
```

## 启动 Redis 与 MySQL（可选：docker）
若使用 docker-compose（在仓库根目录）：
```powershell
docker compose up -d
```

## 启动服务
标准输入输出模式（MCP）：
```powershell
python ASimpleStarGazer.py
```

## 集成点（代码）
在 `ASimpleStarGazer.py` 中新增了：
- `init_connections()`：初始化 `redis.asyncio` 客户端与 `aiomysql` 连接池
- `@mcp.tool("cache_set")`：Redis 缓存写入示例
- `@mcp.tool("db_ping")`：MySQL 探活（`SELECT 1`）

## 快速验证
- Redis：
  - 调用 `cache_set key=test value=hello ttl_seconds=60` 返回 `{"ok": true}`
- MySQL：
  - 调用 `db_ping` 返回 `{"result": true}`

## 常见问题
- 不能连接 Redis/MySQL：检查 `.env` 与服务是否已启动、端口映射是否正确。
- Windows 下端口占用：重启 docker 或修改端口映射。
