import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/*
"id": idcounter,
        "url": url_to_shorten,
        "shortCode": shortCode,          // need a comma here
        "createdAt": Date.now(),
        "updatedAt": Date.now()
*/
const dataschema = new Schema({
    id: Number,
    url: String,
    shortCode: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    accessCount: {
        type: Number,
        default: 0
    }
});


export default mongoose.model("Data", dataschema);