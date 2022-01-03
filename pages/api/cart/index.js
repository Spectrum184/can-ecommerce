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
    case 'POST':
      await addProductToCart(req, res, user);
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

const addProductToCart = async (req, res, user) => {
  try {
    const { productId, name, price, quantity, image } = req.body;

    let message = '';

    const cart = await Cart.findOne({
      userId: user._id,
      active: true,
    });

    if (cart) {
      const product = cart.products.find(
        (product) => product.productId === productId
      );

      if (product) {
        message =
          'Bạn đã thêm sản phẩm này vào giỏ hàng! Bấm vào biểu tượng giỏ hàng trên góc màn hình để kiểm tra!';
      } else {
        cart.products.push({ productId, name, price, quantity, image });
        await cart.save();
        message =
          'Thêm vào giỏ hảng thành công! Bấm vào biểu tượng giỏ hàng trên góc màn hình để kiểm tra!';
      }
    } else {
      console.log({ productId, name, price, quantity, image });

      const newCart = new Cart({
        userId: user._id,
      });
      newCart.products.push({ productId, name, price, quantity, image });

      await newCart.save();
      message =
        'Thêm vào giỏ hảng thành công! Bấm vào biểu tượng giỏ hàng trên góc màn hình để kiểm tra!';
    }

    return res.status(200).json({ message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
