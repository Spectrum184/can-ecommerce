
import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    products: [{ type: mongoose.Types.ObjectId, ref: 'product' }],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
}, {
    timestamps: true
})

let Dataset = mongoose.models.order || mongoose.model('order', orderSchema)
export default Dataset