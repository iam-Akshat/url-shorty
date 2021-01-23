import { Response, Router } from "express";
import { isValidUrl } from "../helpers/ValidateUrl";
import { ILink, Link } from "../models/Link";

const createURL = Router();

createURL.post('/', async (req, res) => {
    const { full_url } = req.body

    if (!isValidUrl(full_url)) {
        return res.status(400).json({ error: "Not a proper URl" })
    }
    try {
        const newShortUrl = await createLinkHelper(full_url, res)
        res.status(200).json({ short_url: newShortUrl.short_url })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ err: error })
    }

    return
})

const createLinkHelper = async (full_url: string, tag?: string, batch_id?: string): Promise<ILink> => {

    const newShortUrl: ILink = await Link.create({ full_url: full_url })

    if (tag) {
        newShortUrl.tag = tag
    } else if (batch_id) {
        newShortUrl.batch_id = batch_id
    }

    return await newShortUrl.save()
}
export { createURL, createLinkHelper }