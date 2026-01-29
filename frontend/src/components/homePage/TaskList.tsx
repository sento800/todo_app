import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";
import type { default as taskType } from "@/types/taskType";

const TaskList = ({
  filteredTasks,
  filter = "all",
  handleTaskChange,
}: {
  filteredTasks: taskType[];
  filter: string;
  handleTaskChange: () => void;
}) => {
  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }
  return (
    <div className="space-y-3">
      {filteredTasks.map((task: taskType, index: number) => (
        <TaskCard
          key={task._id}
          handleTaskChange={handleTaskChange}
          task={task}
          index={index}
        />
      ))}
    </div>
  );
};

export default TaskList;
