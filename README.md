# Task Manager

A full-stack task management application built with **React, TypeScript, Node.js, Express, and MongoDB**. The application allows authenticated users to create, edit, complete, and delete tasks, as well as organize them by day of the week.

## Features

* 🔐 User authentication with **Auth0**
* 📝 Create new tasks
* ✏️ Edit existing tasks
* ✅ Mark tasks as completed or active
* 🗑️ Delete tasks
* 📅 Organize tasks by day of the week
* 🔄 Real-time UI updates after task operations
* 🔔 Success and error notifications
* 🧠 Global state management with **Redux Toolkit**
* 📱 Responsive and modern UI built with **Tailwind CSS**

## Tech Stack

### Frontend

* **React 19**
* **TypeScript**
* **Vite**
* **React Router**
* **Redux Toolkit**
* **React Redux**
* **Axios**
* **Auth0 React SDK**
* **Tailwind CSS**
* **Lucide React**

### Backend

* **Node.js**
* **Express 5**
* **MongoDB**
* **Mongoose**
* **CORS**
* **dotenv**

## Project Structure

The project is divided into two main parts: `frontend` and `backend`.

```text
project/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── tasks.ts
│   │   ├── components/
│   │   │   ├── AddTask.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Notification.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   └── TasksList.tsx
│   │   ├── hooks/
│   │   │   ├── useAppDispatch.ts
│   │   │   ├── useLoadTasks.ts
│   │   │   ├── useNotification.ts
│   │   │   ├── useTaskActions.ts
│   │   │   ├── useTaskEditor.ts
│   │   │   ├── useTaskForm.ts
│   │   │   └── useTasks.ts
│   │   ├── redux/
│   │   │   ├── notificationsSlice.ts
│   │   │   ├── store.ts
│   │   │   └── tasksSlice.ts
│   │   ├── types/
│   │   │   ├── button.ts
│   │   │   ├── task.ts
│   │   │   └── taskCard.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── taskModel.js
│   ├── routes/
│   │   └── taskRouter.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

## Application Architecture

The application follows a simple separation of responsibilities.

```text
                    ┌─────────────────┐
                    │     React UI    │
                    │   Components    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Custom Hooks   │
                    │ Business Logic  │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Redux Toolkit   │
                    │  Global State   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │     Axios       │
                    │   API Client    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Express Server  │
                    │    REST API     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │     MongoDB     │
                    │    Mongoose     │
                    └─────────────────┘
```

### Frontend

The UI is divided into reusable components, while application logic is extracted into custom hooks.

For example:

* `TaskCard` is responsible for displaying an individual task.
* `TasksList` displays tasks for the selected day.
* `AddTask` handles both creating and editing tasks.
* `Header` provides navigation and authentication controls.
* `Notification` displays operation results.

Custom hooks keep business logic separate from UI components:

* `useTaskForm` — handles task creation and editing.
* `useTaskActions` — handles task deletion and completion status changes.
* `useTaskEditor` — manages the currently edited task.
* `useLoadTasks` — loads tasks from the backend after authentication.
* `useTasks` — provides access to tasks stored in Redux.
* `useNotification` — provides access to the current notification.

### State Management

Redux Toolkit is used for global application state.

The store contains two slices:

```text
store
├── tasks
│   └── tasks[]
│
└── notifications
    └── notification
```

The `tasks` slice handles:

* loading tasks
* adding tasks
* updating tasks
* deleting tasks

The `notifications` slice handles success and error messages displayed to the user.

## Authentication

Authentication is handled using **Auth0**.

Unauthenticated users see a welcome screen and are prompted to log in.

After successful authentication:

1. Auth0 authenticates the user.
2. The application detects the authenticated state.
3. `useLoadTasks` loads tasks from the backend.
4. Tasks are stored in Redux.
5. The authenticated user can manage tasks through the UI.

The header also provides login and logout controls.

> **Note:** The current backend API does not perform server-side authentication or associate tasks with individual Auth0 users. Authentication is currently enforced on the frontend.

## Task Model

Tasks are stored in MongoDB using Mongoose.

```text
Task
├── _id          String
├── title        String
├── description  String
├── completed    Boolean
└── day          String
```

### Fields

| Field         | Type    | Required |           Default |
| ------------- | ------- | -------: | ----------------: |
| `_id`         | String  |      Yes | MongoDB generated |
| `title`       | String  |      Yes |                 — |
| `description` | String  |      Yes |                 — |
| `day`         | String  |      Yes |                 — |
| `completed`   | Boolean |       No |           `false` |

Supported days:

```text
Monday
Tuesday
Wednesday
Thursday
Friday
Saturday
Sunday
```

## REST API

The backend exposes a REST API under:

```text
/tasks
```

### Get all tasks

```http
GET /tasks
```

Returns all tasks stored in MongoDB.

### Create a task

```http
POST /tasks
```

Request body:

```json
{
  "title": "Learn TypeScript",
  "description": "Study TypeScript generics and utility types",
  "day": "Monday"
}
```

### Update a task

```http
PUT /tasks/:id
```

Request body:

```json
{
  "title": "Learn TypeScript",
  "description": "Study TypeScript generics and utility types",
  "day": "Monday",
  "completed": true
}
```

### Delete a task

```http
DELETE /tasks/:id
```

Example:

```text
DELETE /tasks/64f123456789abcdef123456
```

Response:

```json
{
  "message": "Task deleted"
}
```

## Routing

The frontend uses dynamic routing for the days of the week.

```text
/monday
/tuesday
/wednesday
/thursday
/friday
/saturday
/sunday
```

The current day is extracted from the URL using `useParams()`.

`TasksList` then filters the tasks stored in Redux:

```text
All tasks
    │
    ▼
TasksList
    │
    ├── Monday → /monday
    ├── Tuesday → /tuesday
    ├── Wednesday → /wednesday
    ├── ...
    └── Sunday → /sunday
```

## Notifications

The application includes a reusable notification system built with Redux Toolkit.

Notifications can have two types:

```text
success
error
```

For example:

* `Task added`
* `Task updated`
* `Something went wrong`

Notifications automatically disappear after three seconds and can also be closed manually.

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB database
* Auth0 account

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `backend` directory:

```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string
```

Do not commit `.env` to the repository.

### 5. Configure Auth0

Create an Auth0 application and configure the application with the required domain and client ID.

For local development, add your frontend URL to the allowed URLs in Auth0.

Typical local development URL:

```text
http://localhost:5173
```

> The Auth0 configuration should be moved to environment variables before deploying the application publicly.

### 6. Start the backend

From the `backend` directory:

```bash
npm run dev
```

The server will start on:

```text
http://localhost:4000
```

### 7. Start the frontend

From the `frontend` directory:

```bash
npm run dev
```

Vite will provide the local development URL in the terminal, usually:

```text
http://localhost:5173
```

## Available Scripts

### Frontend

Start the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Run the linter:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

### Backend

Start the backend in development mode with Nodemon:

```bash
npm run dev
```

## Data Flow

A typical task creation flow looks like this:

```text
User fills out the form
        │
        ▼
    AddTask
        │
        ▼
   useTaskForm
        │
        ▼
    addTask()
        │
        ▼
      Axios
        │
        ▼
 POST /tasks
        │
        ▼
 Express Controller
        │
        ▼
     Mongoose
        │
        ▼
     MongoDB
        │
        ▼
  Created Task
        │
        ▼
 Redux tasksSlice
        │
        ▼
      React UI
```

The same architecture is used for updating and deleting tasks.

## Development

The project was built with a focus on separating UI components from application logic.

Instead of placing all API and state-management logic directly inside components, the application uses:

* API functions for HTTP requests
* Redux slices for global state
* Custom hooks for business logic
* TypeScript interfaces for type safety
* Reusable React components for the UI

This structure makes individual parts of the application easier to understand and modify.

## Future Improvements

Potential improvements for future versions include:

* 🔐 Server-side Auth0 token validation
* 👤 Associating tasks with individual users
* 🔒 Protected backend API routes
* ⚙️ Moving frontend configuration to environment variables
* ✅ Form validation
* 📱 Further responsive UI improvements
* 🧪 Unit and integration tests
* 🚀 Production deployment
* 📊 Task statistics and progress tracking
* 🔎 Task search and filtering

## License

This project is intended for educational and portfolio purposes.
