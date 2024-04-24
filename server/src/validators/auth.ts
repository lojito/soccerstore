import { body } from "express-validator";
import User from "../models/user";

export const requireEmail = body("email")
  .isEmail()
  .withMessage("Dirección de correo electrónico no válida.")
  .custom((value) => {
    return User.findOne({ email: value }).then((userDoc) => {
      if (userDoc) {
        throw Error("Dirección de correo electrónico ya está en uso.");
      }
    });
  })
  .normalizeEmail();

export const requireName = body("name").trim().not().isEmpty();

export const requirePassword = body("password").trim().isLength({ min: 5 });
