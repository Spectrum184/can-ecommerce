import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    products: [{ type: mongoose.Types.ObjectId, ref: 'product' }],
    category: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models.category || mongoose.model('category', CategorySchema);

export default Dataset;
