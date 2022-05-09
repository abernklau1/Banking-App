import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  lastName: {
    type: String,
    maxlength: 20,
    trim: true,
    default: "",
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
    select: false,
  },
  location: {
    type: String,
    maxlength: 20,
    trim: true,
    default: "",
  },
  accNumber: {
    type: String,
    length: 7,
  },
  savings: {
    type: Number,
    maxlength: 8,
  },
  checking: {
    type: Number,
    maxlength: 8,
  },
  totalBalance: {
    type: Number,
    maxlength: 16,
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const passSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, passSalt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
