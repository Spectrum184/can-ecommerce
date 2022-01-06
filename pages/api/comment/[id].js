import Comment from 'models/commentModel';

import { connectDB } from 'utils/connect-db';
import { getSession } from 'next-auth/react';

connectDB();

export default async function handler(req, res) {
  let user = null;
  const session = await getSession({ req });
  if (session) {
    user = session.user;
  }

  switch (req.method) {
    case 'DELETE':
      await deleteComment(req, res, user);
      break;

    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const deleteComment = async (req, res, user) => {
  try {
    if (!user || user.role !== 'admin')
      return res.status(400).json({ error: 'Bạn không có quyền xoá!' });

    const { id } = req.query;

    await Comment.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Xoá thành công!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
