type taskType = {
  _id: number;
  title: string;
  status: string;
  completedAt: null | Date;
  createdAt: Date;
};

export type { taskType as default };
