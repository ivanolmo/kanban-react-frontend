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
  columnId: string;
  task: {
    title: string;
    description: string;
    subtasks: { title: string }[];
  };
};

export type EditTaskInput = {
  id: string;
  columnId: string;
  task: {
    title: string;
    description: string;
    subtasks: { title: string }[];
  };
};

export type FormData = {
  email: string;
  password: string;
  confirmPassword?: string;
};

// request types
export type EditTaskRequest = {
  id: string;
  task: {
    title: string;
    description: string;
    subtasks: { title: string }[];
    columnId: string;
  };
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

export type ApiSubtaskResponse = ApiBaseResponse & {
  data: Subtask;
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

// Search types
export type SearchResult = {
  type: "Board" | "Column" | "Task" | "Subtask";
  item: Board | Column | Task | Subtask;
  board: Board;
};
