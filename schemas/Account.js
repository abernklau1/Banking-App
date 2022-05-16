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
});

export default AccountSchema;
