import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
    //config do model
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);