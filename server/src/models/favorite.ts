import mongoose from "mongoose";
import { IFavorite } from "../interfaces/favorite";

const Schema = mongoose.Schema;

const favoriteSchema = new Schema<IFavorite>(
  {
    productId: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IFavorite>("Favorite", favoriteSchema);
