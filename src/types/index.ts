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
  accentColor: string;
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

export type ApiBoardResponse = {
  data: Board[];
  success: boolean;
  message: string;
  status: string;
};

export type ApiErrorResponse = {
  error: string;
  success: boolean;
  message: string;
  status: string;
};
