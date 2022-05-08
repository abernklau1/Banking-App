import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  accNumber: { type: String, length: 7 },
  totalBalance: {
    type: Number,
    maxlength: 16,
  },
  savings: {
    type: Number,
    maxlength: 8,
  },
  checking: {
    type: Number,
    maxlength: 8,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
});

export default mongoose.model("Account", AccountSchema);
