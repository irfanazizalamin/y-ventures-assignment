export interface Todo {
  id: string;
  userId: number;
  title: string;
  body: string;
  completed: boolean;
  createdAt: number;
}

export type Filter = "all" | "completed" | "pending";
