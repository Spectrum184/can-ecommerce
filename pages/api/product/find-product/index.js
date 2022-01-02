import Product from 'models/productModel';

import { connectDB } from 'utils/connect-db';

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await findProduct(req, res);
      break;
    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const findProduct = async (req, res) => {
  try {
    let result;

    const { type, limit, page } = req.query;

    if (type === 'sale') {
      result = await Product.find()
        .select('-content')
        .skip(Number(page) * 9)
        .sort('-salePrice')
        .limit(Number(limit));
    } else {
      result = await Product.find()
        .limit(Number(limit))
        .skip(Number(page) * 9)
        .sort('-sold')
        .select('-content');
    }

    if (!result) return res.status(400).json([]);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
