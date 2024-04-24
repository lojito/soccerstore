import { Router } from "express";
import { is_auth as isAuth } from "../middleware/is-auth";
import { requireId } from "../validators/favorite";
import {
  getFavorites,
  createFavorite,
  deleteFavorite,
} from "../controllers/favorite";

const router = Router();

router.get("/", isAuth, getFavorites);

router.post("/", isAuth, [requireId], createFavorite);

router.delete("/:productId", isAuth, deleteFavorite);

export default router;
