import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(<string>process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
