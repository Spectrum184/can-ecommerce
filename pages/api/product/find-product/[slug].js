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
    const onSale = await Product.find()
      .select('-content')
      .sort('-salePrice')
      .limit(4);

    const bestSeller = await Product.find()
      .limit(4)
      .sort('-sold')
      .select('-content');

    return res.status(200).json({
      onSale,
      bestSeller,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
