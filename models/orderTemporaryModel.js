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
    products: [
      {
        productId: String,
        quantity: Number,
        name: String,
        price: Number,
        image: String,
      },
    ],
    status: {
      type: String,
      default: 'đang kiểm tra',
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models.orderTemporary ||
  mongoose.model('orderTemporary', orderSchema);
export default Dataset;
