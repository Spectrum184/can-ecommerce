import Cart from 'models/cartModel';

import { connectDB } from 'utils/connect-db';
import { getSession } from 'next-auth/react';

connectDB();

export default async function handler(req, res) {
  let user = null;
  const session = await getSession({ req });
  if (session) {
    user = session.user;
  }

  switch (req.method) {
    case 'GET':
      await getCart(req, res, user);
      break;
    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const getCart = async (req, res, user) => {
  try {
    if (!user) return res.status(200).json({ cart: null });

    const cart = await Cart.findOne({
      userId: user._id,
      active: true,
    });

    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
