import express from "express";
import { getProducts } from "../controllers/productController.js";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/count", async (req, res) => {
  const count = await Product.countDocuments();

  res.json({
    count,
  });
});

router.post("/test-add", async (req, res) => {
  const docs = [];

  for (let i = 0; i < 50; i++) {
    docs.push({
      name: `Test Product ${i}`,
      category: "Books",
      price: 100
    });
  }

  await Product.insertMany(docs);

  res.json({
    message: "50 products added"
  });
});

export default router;