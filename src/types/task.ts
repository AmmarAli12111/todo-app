export type Priority = 1 | 2 | 3 | 4;

export interface Subtask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  estimatedTime: number; // in minutes
}

export interface Task {
  id: string;
  title: string;
  description: string;
  estimatedTime?: number; // in minutes
  completed: boolean;
  createdAt?: Date;
  priority?: Priority;
  dueDate?: string | null; // DuePreset or ISO date string
}
