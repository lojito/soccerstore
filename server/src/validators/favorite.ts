import { body } from "express-validator";

export const requireId = body("productId")
  .trim()
  .isInt({ allow_leading_zeroes: false });
