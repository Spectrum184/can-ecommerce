import User from 'models/userModel';

import { connectDB } from 'utils/connect-db';
import { adminMiddleware } from 'middlewares/admin';

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await findUser(req, res);
      break;
    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const findUser = async (req, res) => {
  try {
    const authError = await adminMiddleware(req);

    if (authError) return res.status(400).json({ error: authError });

    const { username, limit, page } = req.query;

    const start = (Number(page) - 1) * Number(limit);

    const total = await User.find({
      username: { $regex: '.*' + username + '.*' },
    }).count();

    const users = await User.find({
      username: { $regex: '.*' + username + '.*' },
    })
      .select('-password')
      .skip(start)
      .limit(Number(limit));

    if (users.length === 0)
      return res.status(200).json({
        users: [],
        total,
      });

    return res.status(200).json({
      users,
      total: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
