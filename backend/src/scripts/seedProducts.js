import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";

import Product from "../models/Product.js";

dotenv.config();

const categories = [
  "Electronics",
  "Fashion",
  "Books",
  "Sports",
  "Home",
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected");

    const products = [];

    for (let i = 0; i < 200000; i++) {
      products.push({
        name: faker.commerce.productName(),
        category:
          categories[
            Math.floor(Math.random() * categories.length)
          ],
        price: Number(faker.commerce.price()),
      });
    }

    await Product.insertMany(products);

    console.log("200000 Products Inserted");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedProducts();