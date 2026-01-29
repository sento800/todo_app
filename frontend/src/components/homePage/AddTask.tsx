import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({
  handleNewTaskCreated,
}: {
  handleNewTaskCreated: () => void;
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const createTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {
          title: newTaskTitle,
        });
        toast.success("Task đã được tạo thành công!");
        setNewTaskTitle("");
        handleNewTaskCreated();
      } catch (error) {
        console.error("Lỗi khi tạo Task (Create Task):", error);
        toast.error("Lỗi khi tạo task");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Cần phải làm gì?"
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          value={newTaskTitle}
        />
        <Button variant="gradient" size="xl" onClick={createTask}>
          <Plus className="size-5" />
          Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
