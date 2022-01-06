import User from 'models/userModel';
import bcrypt from 'bcrypt';
import Comment from 'models/commentModel';
import Cart from 'models/cartModel';

import { connectDB } from 'utils/connect-db';
import { registerValidate } from 'utils/validate';
import { adminMiddleware } from 'middlewares/admin';

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await getProfile(req, res);
      break;
    case 'PATCH':
      await editProfile(req, res);
      break;
    case 'DELETE':
      await deleteUser(req, res);
      break;
    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const getProfile = async (req, res) => {
  try {
    const { id } = req.query;

    const newUser = await User.findById(id).select('-password');

    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const editProfile = async (req, res) => {
  try {
    const { id } = req.query;
    const { avatar, name, password, confirmPassword, username, email } =
      req.body;

    const error = registerValidate({
      username,
      name,
      email,
      password,
      confirmPassword,
    });

    if (error) return res.status(400).json({ error });

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await User.findByIdAndUpdate(id, {
      avatar,
      name,
      password: passwordHash,
    });

    if (!newUser)
      return res.status(400).json({ error: 'Không tìm thấy tài khoản' });

    return res
      .status(200)
      .json({ message: 'Chỉnh sửa thành công, vui lòng tải lại trang!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const authError = await adminMiddleware(req);

    if (authError) return res.status(400).json({ error: authError });

    const { id } = req.query;

    const user = await User.findOneAndDelete({ _id: id });

    await Cart.deleteMany({ userId: user._id });
    await Comment.deleteMany({ user: user._id });

    return res.status(200).json({ message: 'Xoá thành công tài khoản này' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
