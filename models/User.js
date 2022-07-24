import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 60,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        maxlength: 100,
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        maxlength: 11,
    },
    address:{
        type: String,
        maxlength: 300,
    },
    isAdmin : {
        type: Boolean,
        default:false,
    },
  },
  { timestamps: true }//to create date of create or update obj
);

export default mongoose.models.User ||
mongoose.model("User", UserSchema);