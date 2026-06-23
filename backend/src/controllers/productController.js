import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const limit = Math.min( Number(req.query.limit) || 20, 100 );
    // const limit =  Number(req.query.limit) || 20;

    const category = req.query.category;

    const cursorCreatedAt = req.query.createdAt;
    const cursorId = req.query.id;

    const query = {};

    if (category) {
      query.category = category;
    }

    if (cursorCreatedAt && cursorId) {
      query.$or = [
        {
          createdAt: {
            $lt: new Date(cursorCreatedAt),
          },
        },
        {
          createdAt: new Date(cursorCreatedAt),
          _id: {
            $lt: cursorId,
          },
        },
      ];
    }

    const products = await Product.find(query)
      .sort({
        createdAt: -1,
        _id: -1,
      })
      .limit(limit);

    let nextCursor = null;

    if (products.length > 0) {
      const last = products[products.length - 1];

      nextCursor = {
        createdAt: last.createdAt,
        id: last._id,
      };
    }

    res.status(200).json({
      success: true,
      count: products.length,
      products,
      nextCursor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};