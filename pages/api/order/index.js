import Order from 'models/orderModel';
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
    case 'POST':
      await createOrder(req, res, user);
      break;

    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const createOrder = async (req, res, user) => {
  try {
    if (!user)
      return res.status(400).json({ error: 'Bạn không có quyền xoá!' });

    const { cartData, address, mobile } = req.body;

    if (cartData.products.length === 0)
      return res
        .status(400)
        .json({ error: 'Vui lòng thêm sản phẩm vào giỏ hàng!' });

    const cart = await Cart.findByIdAndUpdate(
      cartData._id,
      {
        products: cartData.products,
        active: false,
      },
      { new: true }
    );

    if (!cart)
      return res.status(400).json({ error: 'Không tìm thấy giỏ hàng!' });

    const order = new Order({
      address,
      mobile,
      cart: cartData._id,
    });

    await order.save();

    return res
      .status(200)
      .json({ message: 'Cảm ơn đã đặt hàng, vui lòng đợi liên hệ!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
