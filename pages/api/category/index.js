import Category from 'models/categoryModel';
import slugify from 'slugify';
import Cache from 'utils/cache';

import { connectDB } from 'utils/connect-db';
import { adminMiddleware } from 'middlewares/admin';

connectDB();

const ttl = 60 * 60 * 24;
const cache = new Cache(ttl);

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

    const { name, category } = req.body;

    if (category === '0')
      return res.status(200).json({ message: 'Vui lòng chọn danh mục!' });

    const slug = slugify(name, {
      replacement: '-',
      trim: true,
      lower: true,
      locale: 'vi',
    });

    const categoryTmp = await Category.findOne({
      slug,
    });

    if (categoryTmp)
      return res.status(200).json({ message: 'Danh mục đã tồn tại!' });

    const newCategory = new Category({
      name,
      slug,
      category,
    });

    await newCategory.save();

    cache.del('categories');

    return res.status(200).json({ message: 'Thêm thành công!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await cache.get('categories', () =>
      Category.find()
        .sort('category')
        .then((data) => data)
        .then((data) => {
          return data.reduce(function (accumulator, obj) {
            let key = obj._doc.category;
            if (!accumulator[key]) {
              accumulator[key] = [];
            }
            accumulator[key].push(obj);
            return accumulator;
          }, {});
        })
    );

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
