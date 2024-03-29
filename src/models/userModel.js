import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: [true, "please provide email"], unique: true },
  mobile: { type:String, required: [true, "please provide Number"]},
  walletAmount : {type:Number, default: 0 },
  firstUpdate : {type:Boolean, default:false },
  isVerified : {type: Boolean, default: false},
  password: { type: String, required: [true, "please provide password"] },
  forgotPasswordToken : String,
  forgotPasswordTokenExpiry : Date,
  verifyToken : String,
  verifyTokenExpiry : Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
