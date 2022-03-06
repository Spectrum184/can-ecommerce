import Category from 'models/categoryModel';

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
    const result = [];
    let total = 0;

    const { type, limit, page } = req.query;
    const start = (Number(page) - 1) * Number(limit);

    const listData = await Category.find({ category: Number(type) }).populate({
      path: 'products',
      select: '-content',
      sort: '-sold',
    });

    for (const item of listData) {
      result.push(...item.products);
    }

    if (result.length === 0)
      return res.status(400).json({
        result: [],
        total,
      });

    return res.status(200).json({
      total: Math.ceil(result.length / Number(limit)),
      result: result.slice(start, start + limit),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
