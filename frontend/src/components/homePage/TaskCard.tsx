import React, { useState } from "react";
import type { default as taskType } from "@/types/taskType";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "../ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";

interface TaskCardProps {
  task: taskType;
  index: number;
  handleTaskChange: () => void;
}

const TaskCard = ({ task, index, handleTaskChange }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(task.title);

  const updateTaskTitle = async () => {
    try {
      // Xử lý cập nhật task ở đây
      const taskId = task._id;
      await api.put(`/tasks/${taskId}`, {
        title: updateTitle,
      });
      setIsEditing(false);
      toast.success("Task đã được cập nhật thành công!");
      handleTaskChange();
    } catch (error) {
      console.error("Lỗi khi cập nhật Task (Update Task):", error);
      toast.error("Lỗi khi cập nhật task");
    }
  };

  const UpdateTaskStatus = async () => {
    try {
      const taskId = task._id;
      if (task.status === "active") {
        await api.put(`/tasks/${taskId}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });
      }
      toast.success("Trạng thái task đã được cập nhật thành công!");
      handleTaskChange();
    } catch (error) {
      console.error("Lỗi khi cập nhập trạng thái task", error);
      toast.error("Lỗi khi cập nhật trạng thái task");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateTaskTitle();
    }
  };

  const deleteTask = async () => {
    try {
      const taskId = task._id;
      await api.delete(`/tasks/${taskId}`);
      handleTaskChange();
      toast.success("Task đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa Task (Delete Task):", error);
      toast.error("Lỗi khi xóa task");
    }
    // Xử lý xóa task ở đây
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fate-in group",
        task.status === "completed" && "opacity-75",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* nút tròn */}
        {/* flex-shrink-0 để khi thu nhỏ ko bị co lại */}
        <Button
          variant="ghost"
          size={"icon"}
          onClick={UpdateTaskStatus}
          disabled={task.status === "completed"}
          className={cn(
            "flex-shrirk-0  size-8 rounded-full transition-all druation-200",
            task.status === "completed"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary",
          )}
        >
          {task.status === "completed" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* hiển thị hoặc chỉnh sửa tiêu đề */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              placeholder="Cần phải làm gì?"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              defaultValue={task.title}
              onChange={(e) => setUpdateTitle(e.target.value)}
              onBlur={() => {
                setIsEditing(false);
                setUpdateTitle(task.title);
              }}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : "text-foreground",
              )}
            >
              {task.title}
            </p>
          )}
          {/* ngày tạo &  ngày hoàn thành */}
          <div className="flex flex-row items-center gap-2 mt-1">
            <div className="flex items-center gap-2">
              <Calendar className="size-3 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground">-</span>
                <div className="flex items-center gap-2">
                  <Calendar className="size-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {new Date(task.completedAt).toLocaleDateString()}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div>
          <div
            className={cn(
              "gap-2 animate-slide-up",
              isEditing ? "block" : "group-hover:inline-flex hidden",
            )}
          >
            {/* nút edit */}
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => setIsEditing(true)}
              className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            >
              <SquarePen className="size-4" />
            </Button>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={deleteTask}
              className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
