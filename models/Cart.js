import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId : {type:String,required:true},
    products : [],
    quantity :{type:Number,default:0},
    total :{type:Number,default:0},
  },
  { timestamps: true }//to create date of create or update obj
);

export default mongoose.models.Cart ||
mongoose.model("Cart", CartSchema);