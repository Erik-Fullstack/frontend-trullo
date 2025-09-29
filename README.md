# Frontend Trullo - Task Management System

Angular frontend for a task management system that works with an Express.js/Prisma backend.

## Features

### User Management
- Create, read, update, delete users
- User roles (USER, ADMIN)
- Password hashing and validation
- List users with optional task population

### Task Management  
- Create, read, update, delete tasks
- Task status management (PENDING, IN_PROGRESS, DONE)
- Assign tasks to users
- List all tasks or only assigned tasks
- Automatic completion timestamps

## Getting Started

### Prerequisites
- Node.js 18+
- Angular CLI
- Express.js backend with Prisma (running on port 3000)
- PostgreSQL database

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. The app will be available at `http://localhost:4200`

### Backend Setup
Make sure your Express.js backend is running on `http://localhost:3000` with the following endpoints:

#### User Endpoints
- `POST /users` - Create user
- `GET /users/:id?tasks=true` - Get user (with optional tasks)
- `GET /users?tasks=true` - Get all users (with optional tasks)
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

#### Task Endpoints  
- `POST /tasks` - Create task
- `GET /tasks/:id?users=true` - Get task (with optional user)
- `GET /tasks?users=true` - Get all tasks (with optional users)
- `GET /tasks/assigned?users=true` - Get assigned tasks
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `PATCH /tasks/:taskId/assign` - Assign task to user

### Database Setup (Optional)
If you want to run just the database with Docker:

```bash
docker compose up -d db
```

This will start a PostgreSQL database on port 5432.

## Project Structure

```
src/
├── app/
│   ├── button-group/     # Action buttons for CRUD operations
│   ├── input-fields/     # Forms for creating/editing users and tasks
│   ├── rendered-window/  # Display results and data visualization
│   ├── services/         # API service for backend communication
│   └── types.ts         # TypeScript type definitions
├── index.html
└── main.ts
```

## Type Definitions

The app uses strongly typed TypeScript interfaces that match the Prisma schema:

- `User` - User entity with role and optional tasks
- `Task` - Task entity with status, assignment, and optional user
- `Status` - Task status enum (PENDING, IN_PROGRESS, DONE)  
- `Role` - User role enum (USER, ADMIN)

## Development

- Frontend runs on port 4200
- Backend should run on port 3000
- Database runs on port 5432 (PostgreSQL)

The frontend automatically handles:
- Form validation
- Error handling and user feedback
- Type safety with TypeScript
- Responsive design with Tailwind CSS
- Material Design components

