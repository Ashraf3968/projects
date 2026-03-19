import { Router } from "express";
import { body } from "express-validator";
import { login, me, signup } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post(
  "/signup",
  [
    body("name").trim().isLength({ min: 2 }),
    body("email").isEmail(),
    body("phone").optional().isLength({ min: 6 }),
    body("password").isLength({ min: 6 })
  ],
  signup
);

router.post("/login", [body("email").isEmail(), body("password").isLength({ min: 6 })], login);
router.get("/me", requireAuth, me);

export default router;
