import { Router } from "express";
import { body } from "express-validator";
import {
  createOrder,
  getApprovedReviews,
  getBootstrap,
  getCategoriesList,
  getProductBySlug,
  listProducts,
  submitContact,
  submitReview
} from "../controllers/storeController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/bootstrap", getBootstrap);
router.get("/products", listProducts);
router.get("/products/:slug", getProductBySlug);
router.get("/categories", getCategoriesList);
router.get("/reviews", getApprovedReviews);
router.post(
  "/contact",
  [body("name").trim().isLength({ min: 2 }), body("email").isEmail(), body("message").trim().isLength({ min: 10 })],
  submitContact
);
router.post(
  "/orders",
  [
    body("customerName").trim().isLength({ min: 2 }),
    body("customerEmail").isEmail(),
    body("customerPhone").trim().isLength({ min: 6 }),
    body("address").trim().isLength({ min: 10 }),
    body("city").trim().isLength({ min: 2 }),
    body("items").isArray({ min: 1 })
  ],
  createOrder
);
router.post(
  "/reviews",
  requireAuth,
  [body("productId").isInt({ min: 1 }), body("rating").isInt({ min: 1, max: 5 }), body("comment").trim().isLength({ min: 8 })],
  submitReview
);

export default router;
