import Category from 'models/categoryModel';
import Product from 'models/productModel';
import slugify from 'slugify';

import { connectDB } from 'utils/connect-db';
import { adminMiddleware } from 'middlewares/admin';

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      await createProduct(req, res);
      break;
    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const createProduct = async (req, res) => {
  try {
    const authError = await adminMiddleware(req);

    if (authError) return res.status(400).json({ error: authError });

    const {
      title,
      price,
      salePrice,
      description,
      content,
      category,
      inStock,
      images,
    } = req.body;

    const slug = slugify(title, {
      replacement: '-',
      trim: true,
      lower: true,
      locale: 'vi',
    });

    const productTmp = await Product.findOne({ slug });

    if (productTmp)
      return res.status(400).json({ error: 'Sản phẩm này đã tồn tại!' });

    const newProduct = new Product({
      title,
      price,
      salePrice,
      description,
      content,
      category,
      inStock,
      images,
      slug,
    });

    await newProduct.save();

    console.log(newProduct);

    const categoryTmp = await Category.findByIdAndUpdate(
      category,
      {
        $push: { products: newProduct._id },
      },
      { new: true }
    );

    if (!categoryTmp)
      return res.status(400).json({ error: 'Chưa chọn danh mục!' });

    return res.status(200).json({ message: 'Tạo sản phẩm thành công!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
