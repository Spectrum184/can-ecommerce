import Order from 'models/orderModel';
import OrderTemporary from 'models/orderTemporaryModel';
import Cart from 'models/cartModel';
import Product from 'models/productModel';

import { connectDB } from 'utils/connect-db';
import { adminMiddleware } from 'middlewares/admin';

connectDB();

export default async function handler(req, res) {
  const error = await adminMiddleware(req);

  if (error) return res.status(400).json({ error });

  switch (req.method) {
    case 'PATCH':
      await editOrder(req, res);
      break;
    case 'DELETE':
      await deleteOrder(req, res);
      break;

    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const editOrder = async (req, res) => {
  try {
    const { address, mobile, status, completed, findBy } = req.body;
    const { id } = req.query;

    if (findBy === '4') {
      await OrderTemporary.findByIdAndUpdate(
        id,
        {
          address,
          mobile,
          status,
          completed,
        },
        { new: true }
      );

      if (completed) {
        const { productId, quantity } = req.body.products[0];

        await Product.findByIdAndUpdate(productId, {
          $inc: { sold: quantity },
        });
      }
    } else {
      await Order.findByIdAndUpdate(
        id,
        {
          address,
          mobile,
          status,
          completed,
        },
        { new: true }
      );

      if (completed) {
        const { cart } = req.body;

        const cartData = await Cart.findOne({ _id: cart });

        if (cartData) {
          const { products } = cartData;

          for (const product of products) {
            await Product.findByIdAndUpdate(product.productId, {
              $inc: { sold: product.quantity },
            });
          }
        }
      }
    }

    return res.status(200).json({ message: 'Chỉnh sửa thành công' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.query;
    const newId = id.substr(1);

    if (id.charAt(0) === '4') {
      await OrderTemporary.findByIdAndDelete(newId);
    } else {
      const order = await Order.findOneAndDelete({
        _id: newId,
      });

      await Cart.findByIdAndDelete(order.cart);
    }

    return res.status(200).json({ message: 'Xoá thành công' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
