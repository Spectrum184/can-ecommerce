import Category from 'models/categoryModel';
import Product from 'models/productModel';
import slugify from 'slugify';
import Cache from 'utils/cache';

import { adminMiddleware } from 'middlewares/admin';
import { connectDB } from 'utils/connect-db';

connectDB();

const ttl = 60 * 60 * 24;
const cache = new Cache(ttl);

export default async function handler(req, res) {
  const authError = await adminMiddleware(req);
  if (authError) return res.status(400).json({ error: authError });

  switch (req.method) {
    case 'PATCH':
      await editCategory(req, res);
      break;
    case 'DELETE':
      await deleteCategory(req, res);
      break;
    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const editCategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (category === '0')
      return res.status(200).json({ message: 'Vui lòng chọn danh mục!' });

    const { id } = req.query;

    const slug = slugify(name, {
      replacement: '-',
      trim: true,
      lower: true,
      locale: 'vi',
    });

    await Category.findOneAndUpdate({ _id: id }, { name, slug, category });

    cache.del('categories');

    return res.status(200).json({ message: 'Cập nhật thành công!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.query;

    const category = await Category.findByIdAndDelete(id);

    await Product.deleteMany({ _id: { $in: category.products } });

    cache.del('categories');
    return res.status(200).json({ message: 'Đã xoá tất cả!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
