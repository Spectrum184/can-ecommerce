import Order from 'models/orderModel';
import OrderTemporary from 'models/orderTemporaryModel';

import { connectDB } from 'utils/connect-db';
import { adminMiddleware } from 'middlewares/admin';

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await findOrder(req, res);
      break;

    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const findOrder = async (req, res) => {
  try {
    const error = await adminMiddleware(req);

    if (error) return res.status(400).json({ error });

    const { type, limit, page } = req.query;
    const start = (Number(page) - 1) * Number(limit);
    let total = 0;
    let orders;

    switch (type) {
      case '1':
        total = await Order.find({ completed: false }).count();
        orders = await Order.find({ completed: false })
          .skip(start)
          .limit(Number(limit));
        break;
      case '2':
        total = await Order.find({ completed: true }).count();
        orders = await Order.find({ completed: true })
          .skip(start)
          .limit(Number(limit));
        break;

      case '3':
        total = await Order.count();
        orders = await Order.find().skip(start).limit(Number(limit));
        break;

      default:
        total = await OrderTemporary.count();
        orders = await OrderTemporary.find().skip(start).limit(Number(limit));
        break;
    }

    return res.status(200).json({
      total: Math.ceil(total / Number(limit)),
      orders,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
