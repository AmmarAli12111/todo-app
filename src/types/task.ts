export type Priority = 1 | 2 | 3 | 4;

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority?: Priority;
}
