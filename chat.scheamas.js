import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  message: String,
  timeStamp: Date,
});

const chatModel = mongoose.model("chat", chatSchema);
export default chatModel;
