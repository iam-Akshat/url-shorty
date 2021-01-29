import { Router } from "express";
import { isValidUrl } from "../helpers/ValidateUrl";
import { createLinkHelper } from "../models/Link";

const createURL = Router();

createURL.post('/', async (req, res) => {
    const { full_url } = req.body

    if (!isValidUrl(full_url)) {
        return res.status(400).json({ error: "Not a proper URl" })
    }
    try {
        const newShortUrl = await createLinkHelper(full_url)
        res.status(200).json({ short_url: newShortUrl.short_url })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ err: error })
    }

    return
})


export { createURL }