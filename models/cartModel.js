import mongoose from 'mongoose';

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
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
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.cart || mongoose.model('cart', cartSchema);
export default Dataset;
