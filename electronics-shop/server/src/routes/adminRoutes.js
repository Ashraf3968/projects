import { Router } from "express";
import { body } from "express-validator";
import {
  dashboardStats,
  deleteCategory,
  deleteProduct,
  deleteReview,
  getSettingsBundle,
  listAdminProducts,
  listCategories,
  listMessages,
  listOrders,
  listReviews,
  listUsers,
  updateOrderStatus,
  updateReviewStatus,
  updateSettingsBundle,
  upsertCategory,
  upsertProduct
} from "../controllers/adminController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.use(requireAuth, requireAdmin);

router.get("/dashboard", dashboardStats);
router.get("/products", listAdminProducts);
router.post(
  "/products",
  upload.single("image"),
  [body("name").trim().isLength({ min: 2 }), body("price").isFloat({ min: 0 }), body("stock").isInt({ min: 0 })],
  upsertProduct
);
router.delete("/products/:id", deleteProduct);

router.get("/categories", listCategories);
router.post("/categories", upsertCategory);
router.delete("/categories/:id", deleteCategory);

router.get("/orders", listOrders);
router.patch("/orders/:id/status", updateOrderStatus);

router.get("/reviews", listReviews);
router.patch("/reviews/:id/status", updateReviewStatus);
router.delete("/reviews/:id", deleteReview);

router.get("/messages", listMessages);
router.get("/users", listUsers);

router.get("/settings", getSettingsBundle);
router.put("/settings", updateSettingsBundle);

export default router;
