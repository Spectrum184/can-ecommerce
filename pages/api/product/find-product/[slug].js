import Product from 'models/productModel';
import Cache from 'utils/cache';

import { connectDB } from 'utils/connect-db';

connectDB();

const ttl = 60 * 60 * 4;
const cache = new Cache(ttl);

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
    const onSale = await cache.get('on-sale', () =>
      Product.find()
        .select('-content')
        .sort('-salePrice')
        .limit(4)
        .then((data) => data)
    );

    const bestSeller = await cache.get('best-seller', () =>
      Product.find()
        .limit(4)
        .sort('-sold')
        .select('-content')
        .then((data) => data)
    );

    return res.status(200).json({
      onSale,
      bestSeller,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
