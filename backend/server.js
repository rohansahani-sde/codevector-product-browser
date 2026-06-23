import express from "express";
import dotenv from "dotenv";

import connectDB from "./src/config/db.js";
import productRoutes from "./src/routes/productRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());



app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CodeVector Product Browser API",
    endpoints: {
      products: "/api/products",
      filter: "/api/products?category=Books",
      pagination: "/api/products?limit=5"
    }
  });
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});