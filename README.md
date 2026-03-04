# Todo List App

A clean, fast, and focused task manager built with React, TypeScript, and Vite. It supports priorities, status filtering, and local persistence so your tasks are ready when you return.

**Features**
- Create, edit, and delete tasks
- Mark tasks as completed
- Priority levels (1 to 4)
- Filter by priority and status (active or completed)
- LocalStorage persistence
- Empty state UI and lightweight animations

**Tech Stack**
- React 19
- TypeScript
- React Router
- Vite
- Tailwind CSS

**Getting Started**
1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview the production build

```bash
npm run preview
```

**Project Structure**
- `src/App.tsx` routing entry
- `src/pages/Index.tsx` main task list page
- `src/hooks/useTasks.tsx` task state and persistence
- `src/component/` UI and feature components

**Notes**
- Tasks are stored in the browser under the `todo-tasks` key in LocalStorage.

**Future Improvements**
- Due dates and reminders
- Subtasks and checklists
- Search and advanced filters
- Drag-and-drop reordering
- Task categories or labels
- Sync and backup with a backend API
