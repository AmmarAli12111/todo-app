import React, { useState } from "react";
import Button from "../component/ui/Button/button";
import EmptyState from "../component/EmptyState/EmptyState";
import AddTaskDialog from "../component/AddTaskDialog/AddTaskDialog";
import TaskItem from "../component/TaskItem/TaskItem";
import { Task } from "../types/task";
import useTasksHook from "../hooks/useTasks";
import Dropdown from "../component/ui/Dropdown/Dropdown";
import FilterBox from "../component/FilterBox/FilterBox";

const Index = () => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete
  } = useTasksHook();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState({
    p1: false, p2: false, p3: false, p4: false,
    active: false, completed: false,
  });

  const anyPriorityFilter = filters.p1 || filters.p2 || filters.p3 || filters.p4;
  const anyStatusFilter = filters.active || filters.completed;

  const filteredTasks = tasks.filter((task) => {
    if (anyPriorityFilter) {
      const match =
        (filters.p1 && task.priority === 1) ||
        (filters.p2 && task.priority === 2) ||
        (filters.p3 && task.priority === 3) ||
        (filters.p4 && task.priority === 4);
      if (!match) return false;
    }
    if (anyStatusFilter) {
      const match =
        (filters.active && !task.completed) ||
        (filters.completed && task.completed);
      if (!match) return false;
    }
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = tasks.length - completedCount;
  
  
const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTask(null);
  };

  const handleEdit = (task: Task)=>{
    setEditingTask(task);
    setDialogOpen(true);
  }

  const hasNoTask = tasks.length === 0;

  return (
    <>
    <div className="todo-list min-h-dvh w-full bg-white">
        <header className=" todo-list-header  border-b border-solid border-b-stone-300">
          <div className="max-w-4xl mx-auto flex justify-between items-center p-4">
            <Dropdown
            className="w-max min-w-44 px-3 py-2 rounded-md"
            trigger={
              <>
                <span className="filters-icon w-4 h-3 flex flex-col gap-[3px]" aria-hidden={true}>
                  <span className="w-full h-px bg-stone-400"></span>
                  <span className="w-[70%] h-px bg-stone-400"></span>
                  <span className="w-[40%] h-px bg-stone-400"></span>
                </span>
                <span className=" sm:text-[14px]">Filters</span>
              </>
            } >
            <div className="priority-filter">
              <h2 className="text-[14px] font-medium">Priority</h2>
              <ul className="ml-2">
                <li>
                  <FilterBox id="priority-one" checked={filters.p1} onChange={(checked) => setFilters(prev => ({ ...prev, p1: checked }))}>Priority 1</FilterBox>
                </li>
                <li>
                  <FilterBox id="priority-two" checked={filters.p2} onChange={(checked) => setFilters(prev => ({ ...prev, p2: checked }))}>Priority 2</FilterBox>
                </li>
                <li>
                  <FilterBox id="priority-three" checked={filters.p3} onChange={(checked) => setFilters(prev => ({ ...prev, p3: checked }))}>Priority 3</FilterBox>
                </li>
                <li>
                  <FilterBox id="priority-four" checked={filters.p4} onChange={(checked) => setFilters(prev => ({ ...prev, p4: checked }))}>Priority 4</FilterBox>
                </li>
              </ul>
            </div>
            <div className="status-filter">
              <h2 className="text-[14px] font-medium">Status</h2>
              <ul className="ml-2">
                <li>
                  <FilterBox id="active-task" checked={filters.active} onChange={(checked) => setFilters(prev => ({ ...prev, active: checked }))}>Active ({activeCount })</FilterBox>
                </li>
                <li>
                  <FilterBox id="completed-task" checked={filters.completed} onChange={(checked) => setFilters(prev => ({ ...prev, completed: checked }))}>Completed ({ completedCount})</FilterBox>
                </li>
              </ul>
            </div>
            </Dropdown>
              <h1 className="text-xl font-semibold leading-tight">Task List</h1>
          <Button className="rounded-sm" variant="secondary" onClick={()=> setDialogOpen(true)}>
          ＋ Add Task
        </Button>
          </div>
      </header>
      <main className="todo-list-main">
        {hasNoTask ?
          (
            <EmptyState />
          ) : filteredTasks.length === 0 ? <EmptyState /> : (
            <div className="task-list p-3 max-w-4xl mx-auto flex flex-col gap-3">
              {filteredTasks.map((task) => (
                <TaskItem key={task.id} task={task} onDelete={() => deleteTask(task.id)} onEdit={() => handleEdit(task)} onToggle={ ()=> toggleTaskComplete(task.id)} />
              ))}
            </div>
          )
        }
      </main>
    </div>
    <AddTaskDialog
      isOpen={dialogOpen}
      onClose={handleCloseDialog}
      onAdd={addTask}
      editTask={editingTask}
      onUpdate={updateTask}
    />
    </>

  );
}

export default Index;


