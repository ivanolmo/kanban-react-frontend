# Next.js, Redux Toolkit, SWR, Tailwind CSS Kanban Task Manager Frontend

[![Vercel](https://vercelbadge.vercel.app/api/ivanolmo/kanban-react-frontend)](https://kanban-react-frontend.vercel.app/)

This is a frontend application for a kanban task manager built with Next.js. The backend API for this frontend is live and hosted on DigitalOcean, and the repository is located at <https://github.com/ivanolmo/kanban-spring-backend>.

## Steps to Setup

**1. Clone the application**

```
git clone https://github.com/ivanolmo/kanban-react-frontend.git
```

**2. Install dependencies**

```
cd kanban-react-frontend
npm install
```

**3. Create a file for environment variables**

In the root folder of the project, create a `.env.local` file. Please use the included `.env.example` file to find the required environment variables you will need to run this project locally. The variables include:

- `NEXT_PUBLIC_API_BASE_URL`: The URL of your backend API
- `NEXTAUTH_SECRET`: A secret key for NextAuth.js
- `NEXTAUTH_URL`: The base URL of your frontend application

**4. Run the app using npm**

```
npm run dev
```

The app will start running at <http://localhost:3000>

**5. Test the app using Jest and React Testing Library**

This repository includes unit and integration tests. You can run all tests with the following command:

```
npm test
```

## Explore the Kanban Task Manager Frontend

The frontend application interacts with the backend API to manage boards, columns, tasks, and subtasks. Here are the main features and their corresponding components:

### Auth

- Register a new user (`AuthPage` component)
- Log in an existing user (`AuthPage` component)
- Log out the current user (`HeaderMenu` component)

### Boards

- Get all boards for the logged-in user (`Boards` page)
- Create a new board (`AddBoard` component)
- Update an existing board (`EditBoard` component)
- Delete a board (`DeleteBoard` component)

### Tasks

- Create a new task in a specific column (`AddTask` component)
- Update an existing task (including moving it to a different column) (`EditTask` component)
- Delete a task (`DeleteTask` component)

### Subtasks

- Toggle the completion status of a subtask (`Subtask` component)

### UI Features

- Responsive design for mobile and desktop
- Dark mode support (`ThemeSwitcher` component)
- Drag and drop functionality for tasks (React DnD library)

## Project Structure

- `src/pages`: Next.js pages
- `src/components`: React components
- `src/store`: Redux store setup and slices
- `src/styles`: Global styles and Tailwind CSS configuration
- `src/types`: TypeScript type definitions
- `src/utils`: Utility functions and constants

## Main Technologies Used

- [Next.js](https://nextjs.org/): React framework for production
- [Redux Toolkit](https://redux-toolkit.js.org/): State management
- [RTK-Query](https://redux-toolkit.js.org/rtk-query/overview): Data fetching and caching
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework
- [NextAuth.js](https://next-auth.js.org/): Authentication for Next.js
- [React Hook Form](https://react-hook-form.com/): Forms with easy-to-use validation
- [TypeScript](https://www.typescriptlang.org/): Static type checking

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm start`: Runs the built app in production mode
- `npm run lint`: Lints the codebase
- `npm test`: Runs the test suite
- `npm run cypress:open`: Opens the Cypress Test Runner

## Sample Component: Board

Here's an example of how the `Board` component might look:

```tsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBoard } from '../store/boardSlice';
import Column from './Column';
import AddColumn from './AddColumn';

const Board = () => {
  const dispatch = useDispatch();
  const currentBoard = useSelector(state => state.board.currentBoard);
  const [columns, setColumns] = useState(currentBoard.columns);

  const handleColumnUpdate = (updatedColumn) => {
    const updatedColumns = columns.map(col => 
      col.id === updatedColumn.id ? updatedColumn : col
    );
    setColumns(updatedColumns);
    dispatch(updateBoard({ ...currentBoard, columns: updatedColumns }));
  };

  return (
    <div className="flex overflow-x-auto p-4">
      {columns.map(column => (
        <Column key={column.id} column={column} onUpdate={handleColumnUpdate} />
      ))}
      <AddColumn onAdd={(newColumn) => setColumns([...columns, newColumn])} />
    </div>
  );
};

export default Board;
```

This component renders the columns of a board, allows for updating columns, and provides the ability to add new columns.

## Deployment

This project is automatically deployed to [Vercel](https://vercel.com/) when changes are pushed to the main branch. The live version can be accessed at <https://kanban.ivanolmo.com/>.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/introduction/getting-started)
- [RTK-Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)
- [React Hook Form Documentation](https://react-hook-form.com/get-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

If you have any questions about building this project locally or have any issues, please feel free to create a new issue in the GitHub repository!
