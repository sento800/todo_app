import AddTask from "@/components/homePage/AddTask";
import DateTimeFilter from "@/components/homePage/DateTimeFilter";
import Footer from "@/components/homePage/Footer";
import Header from "@/components/homePage/Header";
import StatsAndFilters from "@/components/homePage/StatsAndFilters";
import TaskList from "@/components/homePage/TaskList";
import TaskListPagination from "@/components/homePage/TaskListPagination";
import React, { use, useEffect, useState } from "react";
import { toast } from "sonner";
import type taskType from "@/types/taskType";
import api from "@/lib/axios";
import { visibleTasksLimit } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompletedTaskCount(res.data.completedCount);
    } catch (error) {
      console.error("Lỗi khi truy xuất Task (Fetch Tasks):", error);
      toast.error("Lỗi khi tải tasks");
    }
  };

  const filteredTasks = taskBuffer.filter((task: taskType) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "completed";
      default:
        return true;
    }
  });
  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);
  const handleTaskChange = () => {
    fetchTasks();
  };

  // handle Pagination
  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTasksLimit,
    page * visibleTasksLimit,
  );

  if (visibleTasks.length === 0 && page > 1) {
    setPage(page - 1);
  }

  const totalPages = Math.ceil(filteredTasks.length / visibleTasksLimit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Teal Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
          radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #14b8a6 100%)
          `,
          backgroundSize: "100% 100%",
        }}
      />
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Đầu trang */}
          <Header />

          {/* Tạo nhiệm vụ */}
          <AddTask handleNewTaskCreated={handleTaskChange} />

          {/* Thống kê và bộ lọc */}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
          />

          {/* Danh sách nhiệm vụ */}
          <TaskList
            filter={filter}
            filteredTasks={visibleTasks}
            handleTaskChange={handleTaskChange}
          />

          {/* Phân trang và Lọc theo Date */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              page={page}
              handlePrev={handlePrev}
              handleNext={handleNext}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          {/* Chân trang */}
          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
