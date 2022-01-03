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
        productId: Number,
        quantity: Number,
        name: String,
        price: Number,
        image: String,
      },
    ],
    status: {
      type: String,
      default: 'pending',
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
