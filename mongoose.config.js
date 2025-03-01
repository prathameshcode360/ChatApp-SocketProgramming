import mongoose from "mongoose";

const url = "mongodb://localhost:27017/chatapp";
export const connectToDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("connected to DB");
  } catch (error) {
    console.log("Error while connecting to DB", error);
  }
};
