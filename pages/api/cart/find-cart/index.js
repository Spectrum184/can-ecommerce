import Cart from 'models/cartModel';

import { connectDB } from 'utils/connect-db';

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await findCartByUser(req, res);
      break;

    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const findCartByUser = async (req, res) => {
  try {
    const { user, limit, page } = req.query;
    let total = 0;
    let arrCarts = [];
    let arrCartTmp = [];
    const start = (Number(page) - 1) * Number(limit);

    const carts = await Cart.find({ userId: user });

    if (carts.length === 0)
      return res.status(200).json({ carts: arrCarts, total });

    for (const item of carts) {
      arrCartTmp = arrCartTmp.concat(item.products);
    }

    arrCarts = arrCartTmp.slice(start, Number(limit) + start);

    return res.status(200).json({
      carts: arrCarts,
      total: Math.ceil(arrCartTmp.length / Number(limit)),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
