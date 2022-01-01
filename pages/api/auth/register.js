import bcrypt from 'bcrypt';
import User from 'models/userModel';

import { connectDB } from 'utils/connect-db';
import { registerValidate } from 'utils/validate';

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      await register(req, res);
      break;
    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const register = async (req, res) => {
  try {
    const { username, password, email, name, confirmPassword } = req.body;

    const error = registerValidate({
      username,
      password,
      email,
      name,
      confirmPassword,
    });

    if (error) return res.status(400).json({ error });

    if (username === 'google' || username === 'facebook')
      return res
        .status(400)
        .json({ error: 'Vui lòng nhập tên đăng nhập khác!' });

    let user = await User.findOne({ username });

    if (user)
      return res
        .status(400)
        .json({ error: 'Vui lòng nhập tên đăng nhập khác!' });

    user = await User.findOne({ email });

    if (user)
      return res.status(400).json({ error: 'Vui lòng nhập email khác!' });

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new User({ name, username, email, password: passwordHash });

    await newUser.save();

    return res.status(200).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
