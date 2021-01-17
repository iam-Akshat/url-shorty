import { model, Schema, Model, Document } from 'mongoose';
import { nanoid } from 'nanoid';

const LinkSchema: Schema = new Schema({
    full_url: { type: String, required: true },
    short_url: { type: String, default: nanoid(6) },
    tag: { type: String, null: true },
    clicks: { type: Number, default: 0 },
    batch_id: {  type:String }
})

interface ILink extends Document {
    full_url: string,
    short_url: string,
    tag: string,
    clicks: number,
    batch_id: string
}
const Link: Model<ILink> = model('Link', LinkSchema)

export { Link, ILink }