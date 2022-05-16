import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  accType: {
    type: String,
    required: [true, "Please provide account type"],
  },
  balance: {
    type: Number,
    required: [true, "Please provide account balance"],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
});

export default mongoose.model("Account", AccountSchema);
