import Category from 'models/categoryModel';
import slugify from 'slugify';

import { connectDB } from 'utils/connect-db';
import { adminMiddleware } from 'middlewares/admin';

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      await createCategory(req, res);
      break;
    case 'GET':
      await getCategories(req, res);
      break;
    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const createCategory = async (req, res) => {
  try {
    const authError = await adminMiddleware(req);

    if (authError) return res.status(400).json({ error: authError });

    const { name } = req.body;

    const slug = slugify(name, {
      replacement: '-',
      trim: true,
      lower: true,
      locale: 'vi',
    });

    const category = await Category.findOne({
      slug,
    });

    if (category)
      return res.status(200).json({ message: 'Danh mục đã tồn tại!' });

    const newCategory = new Category({
      name,
      slug,
    });

    await newCategory.save();

    return res.status(200).json({ message: 'Thêm thành công!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
