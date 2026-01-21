# Mini Time Tracker

A simple web application for tracking time entries per project.

---

## Technologies

- **Frontend:** Next.js 16 + TypeScript + React + TailwindCSS
- **Backend:** Node.js + Express + TypeScript
- **Database:** SQLite (via Prisma ORM)
- **HTTP client:** Axios
- **Styling/UI:** TailwindCSS
- **Version control:** Git

---

## Setup & Run

### 1. Backend

```bash
cd backend
npm install
# Run migrations (creates SQLite database)
npx prisma migrate dev --name init
# Start backend server
npx ts-node src/index.ts
```

Server will run on: http://localhost:4000
Health check: http://localhost:4000/health
Time entries API: http://localhost:4000/time-entries

### 2. Frontend

```bash
cd frontend
npm install

# Start Next.js dev server
npm run dev
```

App will run on: http://localhost:3000
