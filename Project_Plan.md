# ASimpleStarGazer
🧠 1. Overall Architecture Diagram  
Architecture diagram explanation:
![image](https://github.com/Ruixiaoke/ASimpleStarGazer/blob/main/Assects/en_architecture.png)


📊 2. Main App Workflow (Including AI Agent)
![image](https://github.com/Ruixiaoke/ASimpleStarGazer/blob/main/Assects/en_ai_agent_flow.png)


3. Module Specifications  
✅ MCP Server  
Implemented in: Java, Node.js, Python  

Each Server encapsulates the following tools (with unified APIs):  
- get_weather(location)  
- get_light_pollution(location)  
- get_moon_phase(location)  
- get_planet_positions(location)  
- get_cloud_data(location)  

✅ MCP Client  
- Supports load balancing for MCP Server selection  
- Implements on-demand response caching  
- Automatically attaches Auth Token  

✅ MCP Main App  
- User login/registration interface (calling Auth Server)  
- Location acquisition using Google Geo API  
- Displays map information and analysis scores (0-100)  
- AI chat interface with configurable LLM models  
- LangChain Agent integration with controlled tool access:  
  - Local knowledge base: FAISS + SQLite + Embedding storage/retrieval  
  - Agent restricted to stargazing advice and location analysis  
  - Predefined prompt templates (e.g., "Analyze if my 50km radius is suitable for stargazing")  

✅ Auth Server  
- Supports OAuth2 (e.g., Google/Facebook)  
- Provides:  
  - /auth/login  
  - /auth/token  
  - /auth/validate  
- Identifies abnormal access (IP blacklist, Rate Limit)  
- Returns JWT Token upon successful authentication  

☁️ 4. Deployment Solutions  
1. Local Deployment  
Managed by Docker Compose:  
auth_server, mcp_server, mcp_client, main_app, mysql, faiss_server  
Ideal for development/debugging

3. Cloud Deployment (Recommended AWS/GCP)  
- MCP Server deployment options:  
  Lambda/EC2/App Engine for multi-language microservices  
- Auth Server:  
  GCP Firebase Auth or AWS Cognito  
- Data persistence:  
  - MySQL on RDS  
  - FAISS on local or managed GPU nodes (e.g., AWS SageMaker)  

🗓️ 5. Development Plan (Sprint-based)  
| Week | Tasks |  
|------|-------|  
| 1 | Design DB schema; Build auth server (OAuth + JWT) |  
| 2 | Develop Python MCP Server (Weather + Moon APIs) |  
| 3 | Implement light pollution + NASA API + cloud data tools |  
| 4 | Build MCP Client; Test MCP Server interactions |  
| 5 | Develop Main App UI (Auth, charts, user input) |  
| 6 | Integrate LangChain; Build AI Agent & FAISS knowledge base |  
| 7 | Establish main data flow (Auth→Client→Server→AI) |  
| 8 | Cross-language MCP Server implementation (Node.js/Java) |  
| 9 | Cloud deployment prep: Dockerfile, CI/CD Pipeline |  
| 10 | Full testing (pressure/security); Demo preparation |  
