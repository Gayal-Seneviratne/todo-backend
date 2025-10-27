# Todo Backend 📝

A simple **TypeScript + Express** backend for a Todo app using **TypeORM** and **MySQL**.

## 🚀 Prerequisites
- Node.js (v18+ recommended)
- npm
- MySQL

## ⚡ Quick Start

1. Clone the repo and open the project:
   ```bash
   git clone https://github.com/Gayal-Seneviratne/todo-backend.git
   cd todo-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and update values:
   ```bash
   copy .env.example .env
   ```

4. Start the app in development:
   ```bash
   npm run dev
   ```

The server runs on the port you set in `.env` (default: **4000**).

## 🧾 Environment Variables
```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_db_password
DB_NAME=todo_db
PORT=4001
```

> ✅ The database must exist before running the app.

## 🏗️ Build & Start (Production)

```bash
npm run build
npm start
```

## 🗃️ Database Migrations
- Run migrations:
  ```bash
  npm run migrate:run
  ```
- Revert last migration:
  ```bash
  npm run migrate:revert
  ```
- Generate new migration:
  ```bash
  npm run migrate:generate -- -n AddSomething
  ```

## 🧪 Tests
Run all tests:
```bash
npm test
```

Watch mode:
```bash
npm run test:watch
```

## 🐳 Docker

Build image:
```bash
docker build -t todo-backend .
```

Run container:
```bash
docker run --env-file .env -p 4001:4001 todo-backend
```

Or pass env inline:
```bash
docker run -e DB_HOST=host.docker.internal -e DB_PORT=3306 -e DB_USERNAME=root -e DB_PASSWORD=your_pw -e DB_NAME=todo_db -p 4001:4001 todo-backend
```

---

