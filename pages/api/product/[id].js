import Product from 'models/productModel';
import Comment from 'models/commentModel';
import Category from 'models/categoryModel';

import { adminMiddleware } from 'middlewares/admin';
import { connectDB } from 'utils/connect-db';

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await getProductBySlug(req, res);
      break;
    case 'DELETE':
      await deleteProduct(req, res);
      break;
    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const getProductBySlug = async (req, res) => {
  try {
    const { id } = req.query;

    const product = await Product.findOne({ slug: id });

    if (!product)
      return res.status(400).json({ error: 'Không tồn tại sản phẩm này!' });

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const authError = await adminMiddleware(req);

    if (authError) return res.status(400).json({ error: authError });

    const { id } = req.query;

    const product = await Product.findByIdAndDelete(id);

    await Comment.deleteMany({ productId: product._id });

    await Category.findOneAndUpdate(
      {
        products: [product._id],
      },
      {
        $pull: { products: product._id },
      },
      { new: true }
    );

    return res.status(200).json({ message: 'Xoá thành công!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
