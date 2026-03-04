import React, { useCallback, useRef, useState } from "react";
import Modal from "../ui/Modal/modal";
import Button from "../ui/Button/button";
import Textarea from "../ui/Textarea/textarea";
import PrioritySelect from "../PrioirtySelect/PrioritySelect";
import { Priority, Task } from "../../types/task";


const DIALOG_EXIT_MS = 220;


function trimLines(text: string) {
  return text.replace(/^\s*\n+|\n+\s*$/g, "").trim();
}

interface AddTaskDialogProps {
  onClose: () => void;
  onAdd: (task: Omit<Task, 'id' | 'createdAt' | 'completed' | 'subtasks'>) => void;
  editTask?: Task | null;
  onUpdate?: (id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => void;
  isOpen?: boolean;
}

function AddTaskDialog({ onClose, onAdd, onUpdate, editTask, isOpen = true }: AddTaskDialogProps) {
  const titleTextareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [isExiting, setIsExiting] = React.useState(false);
  const exitTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [priority, setPriority] = useState<Priority>(editTask?.priority || 4);
  const [description, setDescription] = useState(editTask?.description || "")
  const [title, setTitle] = useState(editTask?.title || "");


  const resetForm = useCallback(() => {
    setTitle("");
    setDescription("");
    setPriority(4);
  },[]);


  const submitForm = () => {
    const cleanTitle = trimLines(title);
    const cleanDescription = trimLines(description);
    if (!cleanTitle) return;

    if (editTask && onUpdate) {
      onUpdate(editTask.id, { title: cleanTitle, description: cleanDescription, priority });
    } else {
      onAdd({ title: cleanTitle, description: cleanDescription, priority });
    }
    requestClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  const requestClose = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    exitTimeoutRef.current = setTimeout(() => {
      onClose();
      setIsExiting(false);
      resetForm()
    }, DIALOG_EXIT_MS);
  },[isExiting,onClose,resetForm]);


  React.useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  // Focus title textarea when dialog opens
  React.useEffect(() => {
    if (isOpen && !isExiting && titleTextareaRef.current) {
      // Small delay to ensure modal is fully rendered
      requestAnimationFrame(() => {
        const textarea = titleTextareaRef.current;
        if (textarea) {
          textarea.focus();
          // If editing a task, move cursor to the end of the text
          if (editTask && textarea.value) {
            const length = textarea.value.length;
            textarea.setSelectionRange(length, length);
          }
        }
      });
    }
  }, [isOpen, isExiting, editTask]);

  // Populate form when editing a task
  React.useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || "");
      setDescription(editTask.description || "");
      setPriority(editTask.priority || 4);
    } else {
      resetForm()
    }
  }, [editTask, resetForm]);

  if (!isOpen && !isExiting) return null;

  return (
    <Modal
        onClose={requestClose}
        isOpen={isOpen}
        isExiting={isExiting}
      >
      <form className="add-task-form" onSubmit={handleSubmit}>
        <header className="p-2 flex flex-col">
          <Textarea
            ref={titleTextareaRef}
            value={title}
            placeholder="Task name"
            name="task-name"
            textareaSize="lg"
            preventEmptyShiftEnter={true}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submitForm();
              }
            }}
          />
          <Textarea
            value={description}
            placeholder="Description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="customize-options flex items-center gap-4">
            <PrioritySelect value={priority} onChange={setPriority} />
          </div>
        </header>
        <div className="modal-footer flex justify-end items-center py-4 px-5 border-t border-t-gray-300 gap-2.5 mt-2">
            <Button type="button" className="rounded-sm" onClick={requestClose} variant="primary">Cancel</Button>
            <Button type="submit" className="rounded-sm" variant="secondary">{editTask ? 'Save' : 'Add Task'}</Button>
        </div>
      </form>

    </Modal>
  );
}

export default AddTaskDialog;
