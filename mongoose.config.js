import mongoose from "mongoose";

const url = "mongodb://localhost:27017/chatapp";

const connetctToDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("DB connected");
  } catch (error) {
    console.log("Error occures while connecting to database");
  }
};
export default connetctToDB;
