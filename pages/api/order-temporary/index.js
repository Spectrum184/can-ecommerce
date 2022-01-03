import OrderTemporary from 'models/orderTemporaryModel';

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      await createOrder(req, res);
      break;

    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const createOrder = async (req, res) => {
  try {
    const { product, address, mobile } = req.body;

    const order = new OrderTemporary({
      address,
      mobile,
      products: [product],
    });

    await order.save();

    return res
      .status(200)
      .json({ message: 'Cảm ơn đã đặt hàng, vui lòng đợi liên hệ!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
