import Cart from 'models/cartModel';
import OrderTemporary from 'models/orderTemporaryModel';
import User from 'models/userModel';

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

    case 'GET':
      await getCart(req, res);
      break;

    case 'PUT':
      await editCartProducts(req, res, user);
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

const getCart = async (req, res) => {
  try {
    const { id } = req.query;
    const newId = id.substr(1);
    let cart;
    let user = '';

    if (id.charAt(0) === '4') {
      cart = await OrderTemporary.findById(newId);
    } else {
      cart = await Cart.findById(newId);
      user = await User.findById(cart.userId);
    }

    return res.status(200).json({ ...cart._doc, user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const editCartProducts = async (req, res, user) => {
  try {
    if (!user && user.role !== 'admin')
      return res.status(400).json({ error: 'Bạn không có quyền xoá!' });

    const { id } = req.query;
    const { products } = req.body;

    const newId = id.substr(1);
    if (id.charAt(0) === '4') {
      await OrderTemporary.findByIdAndUpdate(newId, { products });
    } else {
      await Cart.findByIdAndUpdate(newId, { products });
    }
    return res.status(200).json({ message: 'Sửa/Xoá thành công' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
