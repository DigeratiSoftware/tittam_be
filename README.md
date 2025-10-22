# User Microservice (Node + TypeScript + MongoDB)

Features:
- Register, login with access + refresh tokens
- Access token: 1 day expiry
- Refresh token: 6 months (180 days) expiry
- Update profile, change password, activate/deactivate, delete user
- Zod validation + Mongoose schema validation
- Patterns: Repository, Service, Strategy/Adapter, Middleware

Run:
1. cp .env.example .env and fill values
2. npm install
3. npm run dev
