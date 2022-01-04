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
    let total = 0;

    const { type, limit, page } = req.query;
    const start = (Number(page) - 1) * Number(limit);

    if (type === 'sale') {
      result = await Product.find()
        .select('-content')
        .skip(start)
        .sort('-salePrice')
        .limit(Number(limit));
      total = await Product.find({
        salePrice: { $gt: 0 },
      }).count();
    } else {
      result = await Product.find()
        .skip(start)
        .limit(Number(limit))
        .sort('-sold')
        .select('-content');

      total = await Product.count();
    }

    if (result.length === 0)
      return res.status(400).json({
        result: [],
        total,
      });

    return res.status(200).json({
      result,
      total: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
