import express from "express";
import dotenv from "dotenv";

import connectDB from "./src/config/db.js";
import productRoutes from "./src/routes/productRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});