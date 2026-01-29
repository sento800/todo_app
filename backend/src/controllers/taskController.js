import Task from "../models/taskModel.js";

export const getAllTasks = async (req, res) => {
  //lấy filter từ query params để xem user muốn lọc theo cái gì
  const { filter = "today" } = req.query;
  const nowDate = new Date(); //lấy ngày giờ hiện tại
  let startDay;

  switch (filter) {
    case "today":
      startDay = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        nowDate.getDate(),
      );
      break;
    case "week":
      const mondayDate =
        nowDate.getDate() -
        (nowDate.getDay() - 1) -
        (nowDate.getDay() === 0 ? 7 : 0);
      startDay = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        mondayDate,
      );
      break;
    case "month":
      startDay = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);
      break;
    case "all":
    default:
      startDay = null;
  }
  //tạo query để lọc
  const query = startDay ? { createdAt: { $gte: startDay } } : {};

  try {
    const result = await Task.aggregate([
      {
        $match: query,
      },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completedCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);
    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completedCount = result[0].completedCount[0]?.count || 0;

    res.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi hệ thống",
    });
    console.error("Lỗi khi gọi getAllTasks");
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    const task = await Task.create({
      title,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi hệ thống",
    });
    console.error("Lỗi khi gọi createTask");
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt,
      },
      { new: true },
    );

    if (!updateTask) {
      res.status(404).json({
        message: "Task không tồn tại",
      });
    }

    res.status(200).json(updateTask);
  } catch (error) {
    console.log("Lỗi khi gọi updateTask");
    res.status(500).json("Lỗi hệ thống");
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteTask);
  } catch (error) {
    console.log("Lỗi khi gọi deleteTask");
    res.status(500).json("Lỗi hệ thống");
  }
};
