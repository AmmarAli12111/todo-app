import React, { useState } from "react";
import { Task } from "../../types/task";
import Button from "../ui/Button/button";
import { cn } from "../../lib/utils";

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const TaskItem = ({ task, onToggle, onDelete, onEdit }:TaskItemProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const handleDelete = () => {
    setIsExiting(true);
  };

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLElement>) => {
    if (e.animationName === "task-enter") {
      setHasEntered(true);
    }
    if (e.animationName === "task-exit") {
      onDelete();
    }
  };
  
  return (
    <article
      className={cn(
        "task-item-card flex justify-between gap-3 p-5 rounded-xl bg-white transition-all duration-300 border border-solid border-gray-200 cursor-pointer min-h-32",
         !hasEntered && "animate-task-enter",
          isExiting && "animate-task-exit pointer-events-none",
        task.completed ? 'opacity-50' : "shadow-sm hover:shadow-lg hover:border-gray-300")}
      onAnimationEnd={handleAnimationEnd}
    >
      <button
        onClick={onToggle}
        type="button"
        className={cn(
          "task-checkbox flex items-center justify-center w-5 h-5 rounded-full border-2 border-solid cursor-pointer shrink-0",
          task.priority === 1 && "border-[#db4c3f] text-[#db4c3f] bg-[#db4c3f]/20",
          task.priority === 2 && "border-[#d97706] text-[#d97706] bg-[#d97706]/20",
          task.priority === 3 && "border-[#2563eb] text-[#2563eb] bg-[#2563eb]/20",
          task.priority === 4 && "border-[#737373] text-[#737373] bg-[#737373]/20",
        )}
        aria-label="Mark task as completed"
        aria-pressed={task.completed}
      >
        {
          task.completed && 
          <span className="task-checkbox-checkmark" aria-hidden="true" >
            ✓
          </span>
        }
      </button>
      <div className="task-item-main-content flex gap-2 flex-1">
        <div className="task-item-text-content">
          <h3 className={cn(
            "task-item-title m-0 text-[#1c1917] text-sm font-medium leading-5 wrap-anywhere",
            task.completed && 'text-muted-fg line-through'
          )}>{task.title}</h3>
          {task.description ? (
            <p className="task-item-description m-0 text-stone-500 text-sm font-normal leading-4 wrap-anywhere">{task.description}</p>
          ) : null}
        </div>
      </div>

      <div className="task-item-actions flex items-start gap-1">
        <Button aria-label="Edit task" variant="transparent" className="task-item-action cursor-pointer transition-colors rounded-sm p-0" onClick={onEdit}>
          ✏️
        </Button>
        <Button aria-label="Delete task" variant="transparent" className="task-item-action cursor-pointer transition-colors rounded-sm" onClick={handleDelete}>
          🗑️
        </Button>
      </div>
    </article>
  );
};

export default TaskItem;
