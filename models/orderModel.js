import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    cart: [{ type: mongoose.Types.ObjectId, ref: 'cart' }],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.order || mongoose.model('order', orderSchema);
export default Dataset;
