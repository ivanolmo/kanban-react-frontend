// Entity types
export type Board = {
  id: string;
  userId: string;
  name: string;
  columns: Column[];
  createdAt: Date;
  updatedAt: Date;
};

export type Column = {
  id: string;
  boardId: string;
  color: string;
  name: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
};

export type Task = {
  id: string;
  columnId: string;
  title: string;
  description: string;
  completed: boolean;
  subtasks: Subtask[];
  createdAt: Date;
  updatedAt: Date;
};

export type Subtask = {
  id: string;
  taskId: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Form data types
export type CreateBoardInput = {
  name: string;
  columns: { name: string; color: string }[];
};

export type EditBoardInput = {
  id: string;
  name: string;
  columns: { name: string; color: string }[];
};

export type CreateTaskInput = {
  columnId: { id: string };
  title: string;
  description: string;
  subtasks: { title: string }[];
};

export type FormData = {
  email: string;
  password: string;
};

// API response types
type ApiBaseResponse = {
  success: boolean;
  message: string;
  status: string;
};

export type ApiBoardResponse = ApiBaseResponse & {
  data: Board;
};

export type ApiBoardsResponse = ApiBaseResponse & {
  data: Board[];
};

export type ApiTaskResponse = ApiBaseResponse & {
  data: Task;
};

export type ApiErrorResponse = ApiBaseResponse & {
  error: string;
};

export type AuthSuccessResponse = ApiBaseResponse & {
  data: {
    user_id: string;
    email: string;
    access_token: string;
  };
};

export type AuthErrorResponse = ApiBaseResponse & {
  error: string;
};
