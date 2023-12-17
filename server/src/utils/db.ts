import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connect to database");
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
};
