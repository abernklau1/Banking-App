import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  accNumber: {
    type: String,
    length: 7,
  },
  accountType: {
    type: String,
  },
  savings: {
    type: Number,
    maxlength: 8,
  },
  checking: {
    type: Number,
    maxlength: 8,
  },
  balance: {
    type: Number,
    maxlength: 8,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
});

// const AccountsSchema = new mongoose.Schema({
//   accounts: [
//     {
//       accType: String,
//       balance: { type: Number, maxlength: 8 },
//       createdBy: {
//         type: mongoose.Types.ObjectId,
//         ref: "User",
//         required: [true, "Please provide user"],
//       },
//     },
//   ],
// });

export default mongoose.model("Account", AccountSchema);
