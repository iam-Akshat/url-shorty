import { Response,Router } from "express";
import { isValidUrl } from "../helpers/ValidateUrl";
import { ILink, Link } from "../models/Link";

const createURL = Router();

createURL.post('/', async (req, res) => {
    const { full_url } = req.body
    await createLinkHelper(full_url,res)
    return
})

const createLinkHelper = async (full_url: string,res: Response, tag?: string ): Promise<Response | ILink | void> =>{
    if (!isValidUrl(full_url)) {
        return res.status(400).json({ message: "Not a proper URl" })
    }
    try {
        const newShortUrl: ILink = await Link.create({ full_url: full_url })
        if(tag){
            newShortUrl.tag = tag
        }
        res.status(200).json({ short_url: newShortUrl.short_url })
        return await newShortUrl.save()
    } catch (error) {
        console.error(error)
        res.status(500).json({ err: error })
    }
    return
}
export { createURL,createLinkHelper }