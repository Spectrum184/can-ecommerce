import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
    content: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
}, {
    timestamps: true
})

let Dataset = mongoose.models.reply || mongoose.model('reply', replySchema)

export default Dataset