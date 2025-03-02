import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  username: String,
  message: String,
  time: Date,
});

const chatModel = mongoose.model("chat", chatSchema);
export default chatModel;
