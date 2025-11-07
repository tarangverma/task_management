# Nest.js Task Management API

A complete task management system with teams, authentication, and TypeORM.

## Features
- ✅ JWT Authentication with Bearer Token
- ✅ Create and manage tasks with full CRUD operations
- ✅ Create teams and add team members
- ✅ Assign tasks to team members
- ✅ Load all tasks with assignee information
- ✅ Update task status and properties
- ✅ Full TypeScript type-checking
- ✅ TypeORM with postgreSQL support

## Installation

```bash
npm install
```

## Database Setup

1. Create a postgreSQL database named `task_management`
2. Update `.env` file with your database credentials

## Environment Variables

Create a `.env` file in the root directory:

```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_usersname
DB_PASSWORD=your_password
DB_DATABASE=your_databse_name

JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- **POST** `/auth/login` - Login and get JWT token

### Tasks
- **POST** `/tasks` - Create a new task
- **GET** `/tasks` - Get all tasks with assignees
- **GET** `/tasks/:id` - Get a specific task
- **PATCH** `/tasks/:id` - Update task properties
- **PATCH** `/tasks/:id/assign` - Assign task to a team member
- **DELETE** `/tasks/:id` - Delete a task

### Teams
- **POST** `/teams` - Create a new team
- **GET** `/teams` - Get all teams
- **GET** `/teams/:id` - Get a specific team with members
- **POST** `/teams/:teamId/members` - Add a member to a team
- **GET** `/teams/members/all` - Get all team members
- **GET** `/teams/members/:id` - Get a specific team member
- **DELETE** `/teams/:id` - Delete a team

## Usage Examples

### 1. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### 2. Create a Team
```bash
curl -X POST http://localhost:3000/teams \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Development Team", "description": "Backend developers"}'
```

### 3. Add Team Member
```bash
curl -X POST http://localhost:3000/teams/TEAM_ID/members \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "role": "Developer"}'
```

### 4. Create a Task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Implement Login API",
    "description": "Create JWT-based authentication",
    "dueDate": "2025-12-31",
    "priority": "HIGH",
    "status": "TODO",
    "assigneeId: "TEAM_MEMBER_ID" (optional)
  }'
```

### 5. Assign Task to Team Member
```bash
curl -X PATCH http://localhost:3000/tasks/TASK_ID/assign \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"assigneeId": "TEAM_MEMBER_ID"}'
```

### 6. Get All Tasks with Assignees
```bash
curl -X GET http://localhost:3000/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 7. Update Task Status
```bash
curl -X PATCH http://localhost:3000/tasks/TASK_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "IN_PROGRESS"}'
```

## Task Status Options
- `TODO`
- `IN_PROGRESS`
- `IN_REVIEW`
- `DONE`

## Task Priority Options
- `LOW`
- `MEDIUM`
- `HIGH`
- `URGENT`

## Database Support
The application supports MySQL, PostgreSQL, and MongoDB. Change the `DB_TYPE` in `.env`:
- `mysql`
- `postgres`
- `mongodb`

## Type Safety
All DTOs include class-validator decorators for runtime validation and TypeScript interfaces for compile-time type checking.
