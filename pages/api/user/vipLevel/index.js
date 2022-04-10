import User from 'models/userModel';

import { connectDB } from 'utils/connect-db';

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case 'PATCH':
      await updateUserVipStatus(req, res);
      break;
    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const updateUserVipStatus = async (req, res) => {
  try {
    const { id } = req.query;
    const { vipLevel } = req.body;
    const user = await User.findByIdAndUpdate(id, { vipLevel }, { new: true });
    if (!user)
      return res.status(400).json({ error: 'Người dùng không tồn tại' });

    return res.status(200).json({ message: 'Lưu thay đổi thành công!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
