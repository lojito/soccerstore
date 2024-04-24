import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import Favorite from "../models/favorite";
import User from "../models/user";
import errorHandler from "../middleware/error";
import { ResponseError } from "../interfaces/error";

export const getFavorites: RequestHandler = async (req, res, next) => {
  try {
    const favorites = await Favorite.find(
      { user: req.userId },
      { productId: 1, _id: 0 }
    ).sort({
      createdAt: -1,
    });

    res.status(200).json(favorites.map(({ productId }) => productId));
  } catch (err) {
    errorHandler(err, next);
  }
};

export const createFavorite: RequestHandler = async (req, res, next) => {
  const { productId } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.") as ResponseError;
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const favorite = await Favorite.create({
      productId,
      user: req.userId,
    });

    const user = await User.findById(req.userId);
    if (user) {
      user.favorites.push(favorite);

      await user.save();

      res.status(201).json({
        message: "Favorite created",
        favorite: {
          productId,
          _id: favorite._id,
        },
      });
    }
  } catch (err: any) {
    errorHandler(err, next);
  }
};

export const deleteFavorite: RequestHandler<{ productId: string }> = async (
  req,
  res,
  next
) => {
  const { productId } = req.params;

  try {
    const favorite = await Favorite.findOne({ productId }, { _id: 1, user: 1 });
    if (!favorite) {
      return res.status(400).json({ error: "No such favorite" });
    }

    if (favorite.user.toString() !== req.userId!.toString()) {
      const error = new Error("Not autorized!") as ResponseError;
      error.statusCode = 403;
      throw error;
    }

    await Favorite.findOneAndRemove({ productId });

    const id = favorite._id;
    const user = await User.findById(req.userId);
    const index = user!.favorites.findIndex(
      (favorite) => favorite.toString() === id.toString()
    );
    if (index !== -1) {
      user!.favorites.splice(index, 1);
      user!.save();
    }

    res.status(200).json(favorite);
  } catch (err: any) {
    errorHandler(err, next);
  }
};
