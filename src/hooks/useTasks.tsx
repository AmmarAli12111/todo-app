
import { useEffect, useState } from "react";
import { Task } from "../types/task";


const STORAGE_KEY = "todo-tasks";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((task: Task) => ({
          ...task,
          priority: task.priority ?? 4,
        }));
      } catch {
        return [];
      }
    }
      return [];
  })

    useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);
  
  const addTask = (task:Omit<Task,"id" | 'completed'>) => {
    const newTask = {
      ...task,
      id: crypto.randomUUID(),
      completed: false,
    }
    setTasks((prev)=> [newTask,...prev])
  }

  const updateTask = (id: string, updates: Partial<Omit<Task, "id">>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev)=> prev.filter(task => task.id !== id))
  }

  const toggleTaskComplete = (id: string) => {
    setTasks((prev) => 
      prev.map((task) => 
        task.id === id ?{...task ,completed:!task.completed} :task
      )
    )
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete
  }
}


export default useTasks;