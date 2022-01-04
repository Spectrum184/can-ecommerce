import User from 'models/userModel';

import { connectDB } from 'utils/connect-db';
import { registerValidate } from 'utils/validate';
import bcrypt from 'bcrypt';

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await getProfile(req, res);
      break;
    case 'PATCH':
      await editProfile(req, res);
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
