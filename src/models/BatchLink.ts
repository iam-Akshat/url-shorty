import { model, Schema, Model, Document, ObjectId } from 'mongoose';
import { ILink } from "./Link";
import { nanoid } from 'nanoid';

const BatchLinkSchema: Schema = new Schema({
    batch_name: { type: String, required: true },
    batch_url: { type: String, required: true },
    batch_report_url: { type: String, default: nanoid(6) },
    urls: [{ type: Schema.Types.ObjectId, ref: 'Link' }]
})

interface IBatchLink extends Document {
    batch_name: string,
    batch_url: string,
    batch_report_url: string,
    urls: Array<ILink>
}

const BatchLink: Model<IBatchLink> = model('BatchLink', BatchLinkSchema)

export { IBatchLink, BatchLink }