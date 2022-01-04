import User from 'models/userModel';

import { connectDB } from 'utils/connect-db';

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await getProfile(req, res);
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
