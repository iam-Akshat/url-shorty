import { model, Schema, Model, Document } from 'mongoose';
import { nanoid } from 'nanoid';

const LinkSchema: Schema = new Schema({
    full_url: { type: String, required: true },
    short_url: { type: String, default: '' },
    tag: { type: String, null: true },
    clicks: { type: Number, default: 0 },
    batch_id: { type: String }
})

interface ILink extends Document {
    full_url: string,
    short_url: string,
    tag: string,
    clicks: number,
    batch_id: string
}
const Link: Model<ILink> = model('Link', LinkSchema)

const createLinkHelper = async (full_url: string, tag?: string, batch_id?: string): Promise<ILink> => {

    const newShortUrl: ILink = await Link.create({ full_url: full_url,short_url:nanoid((Math.ceil(Math.random()*2) -1)+6) })

    if (tag) {
        newShortUrl.tag = tag
    }
    if (batch_id) {
        newShortUrl.batch_id = batch_id
    }

    return await newShortUrl.save()
}

export { Link, ILink, createLinkHelper }