import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: [true, "please provide email"]},
  amount : {type:Number, default: 0 },
  mobile: {
    type: String,
    required: [true, "please provide Number"],
    unique: true,
  },
  villageName: {type: String},
});

const farmer = mongoose.models.farmers || mongoose.model("farmers", farmerSchema);

export default farmer;
