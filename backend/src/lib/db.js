import mongoose from "mongoose";

const connectDB = async () => {
  try {
    //@ts-ignore
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("Kết nối database thành công");
  } catch (error) {
    console.error("Lỗi khi kết nối database", error);
    process.exit(1);
  }
};

export default connectDB;
