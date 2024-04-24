import mongoose from "mongoose";
import { IUser } from "../interfaces/user";

const Schema = mongoose.Schema;

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Favorite",
    },
  ],
});

export default mongoose.model<IUser>("User", userSchema);
