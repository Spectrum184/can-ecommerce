import Comment from 'models/commentModel';

import { connectDB } from 'utils/connect-db';

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      await findComment(req, res);
      break;

    case 'POST':
      await createComment(req, res);
      break;

    default:
      throw new Error('Chưa định nghĩa request method');
  }
}

const findComment = async (req, res) => {
  try {
    const { productId, limit, page } = req.query;
    const start = (Number(page) - 1) * Number(limit);

    const total = await Comment.find({ productId }).count();
    const comments = await Comment.find({ productId })
      .populate('user')
      .skip(start)
      .limit(Number(limit));

    if (!comments)
      return res.status(200).json({
        total: 0,
        comments: [],
      });

    return res.status(200).json({
      total: Math.ceil(total / Number(limit)),
      comments,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { productId, user, content } = req.body;

    const comment = new Comment({ productId, user, content });

    await comment.save();

    return res.status(200).json({ message: 'Bình luận thành công!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
