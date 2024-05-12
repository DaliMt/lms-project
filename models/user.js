import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: String,
    password: String,
    role : String,
    imageUrl: String,
  },
  { timestamps: true }
);
mongoose.models = {};
const User = mongoose.models.User || mongoose.model("User",userSchema)

// export default User ; 
export  {User} ; 