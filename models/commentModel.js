import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true,
    },
    replies: [{ type: mongoose.Types.ObjectId, ref: 'reply' }],
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'product'
    }
}, {
    timestamps: true
})

let Dataset = mongoose.models.comment || mongoose.model('comment', commentSchema)

export default Dataset