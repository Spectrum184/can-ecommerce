import Category from 'models/categoryModel';
import Product from 'models/productModel';

import { connectDB } from 'utils/connect-db';

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await findProductByCategory(req, res);
      break;
    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const findProductByCategory = async (req, res) => {
  try {
    const { category, limit, page } = req.query;

    const categoryTmp = await Category.findOne({ slug: category });

    if (!categoryTmp)
      res.status(400).json({ error: 'Không tìm thấy danh mục' });

    const start = (Number(page) - 1) * Number(limit);

    const arrProduct = categoryTmp.products.slice(start, Number(limit) + start);

    const products = await Product.find({
      _id: { $in: arrProduct },
    }).select('-content');

    return res
      .status(200)
      .json({
        products,
        total: Math.ceil(categoryTmp.products.length / limit),
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
