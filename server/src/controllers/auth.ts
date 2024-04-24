import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import errorHandler from "../middleware/error";
import { ResponseError } from "../interfaces/error";
import { IUser } from "../interfaces/user";

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validación fallida.") as ResponseError;
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { email, name, password } = req.body as IUser;

    const hashedPw = await bcrypt.hash(password, 12);

    const user = await User.create({
      email: email,
      password: hashedPw,
      name: name,
    });

    res.status(201).json({
      name: user.name,
      userId: user._id,
    });
  } catch (err) {
    errorHandler(err, next);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body as IUser;
  let loadedUser: IUser;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error(
        "El sistema no pudo encontrar un usuario que tenga este e-mail."
      ) as ResponseError;
      error.statusCode = 401;
      throw error;
    }

    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Contraseña invalida!") as ResponseError;
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id!.toString(),
      },
      process.env.secret!,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      name: loadedUser.name,
      userId: loadedUser._id!.toString(),
    });
  } catch (err: any) {
    errorHandler(err, next);
  }
};
