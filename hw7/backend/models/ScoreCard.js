import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const scoreCardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    score:{
        type: Number,
        required: true
    }
})
const scoreCard = mongoose.model('scoreCard', scoreCardSchema)

export default scoreCard;