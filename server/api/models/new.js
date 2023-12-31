import mongoose from 'mongoose';

const newSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['emergencies', 'featured_events', 'unauthorized_person', 'unauthorized_vehicle']
    },
    detail: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image_url: {
        type: String
    }
}, { timestamps: true });

const New = mongoose.model('New', newSchema);

export default New;