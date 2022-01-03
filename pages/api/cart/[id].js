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
    case 'PATCH':
      await deleteProductInCart(req, res, user);
      break;
    case 'DELETE':
      await deleteCart(req, res, user);
      break;

    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const deleteProductInCart = async (req, res, user) => {
  try {
    if (!user)
      return res.status(400).json({ error: 'Bạn không có quyền xoá!' });

    const { id } = req.query;
    const { productId } = req.body;

    const cart = await Cart.findById(id);

    if (!cart)
      return res.status(400).json({ error: 'Không tìm thấy giỏ hàng' });

    const newProducts = cart.products.filter(
      (product) => product.productId !== productId
    );

    cart.products = newProducts;

    await cart.save();

    return res.status(200).json({ message: 'Đã xoá sản phẩm khỏi giỏ hàng' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCart = async (req, res, user) => {
  try {
    if (!user || user.role !== 'admin')
      return res.status(400).json({ error: 'Bạn không có quyền xoá!' });
    const { id } = req.query;
    await Cart.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Xoá thành công!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
