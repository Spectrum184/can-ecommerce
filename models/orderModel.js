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
    cart: { type: mongoose.Types.ObjectId, ref: 'cart' },
    status: {
      type: String,
      default: 'đang kiểm tra',
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.order || mongoose.model('order', orderSchema);
export default Dataset;
