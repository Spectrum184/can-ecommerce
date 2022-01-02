import Product from 'models/productModel';

import { connectDB } from 'utils/connect-db';

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await getProductBySlug(req, res);
      break;
    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const getProductBySlug = async (req, res) => {
  try {
    const { id } = req.query;

    const product = await Product.findOne({ slug: id });

    if (!product)
      return res.status(400).json({ error: 'Không tồn tại sản phẩm này!' });

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
