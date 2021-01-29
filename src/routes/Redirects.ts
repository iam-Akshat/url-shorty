import { Router } from "express";
import { validateShortUrl } from "../helpers/ValidateShortUrl";
import { ILink, Link } from "../models/Link";
const redirects: Router = Router()

redirects.get('/:short', async (req, res) => {
    const url = req.params.short;
    if (validateShortUrl(url) == false) {
        return res.status(400).json(
            { message: 'Invalid URL' }
        )
    }
    try {
        const redirect: ILink = await Link.findOne({ short_url: url })

        if (redirect == null) {
            return res.status(404).json(
                { message: 'not found' }
            )
        }
        redirect.clicks++
        redirect.save()

        return res.status(301).redirect(redirect.full_url)
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'internal error' })
    }

})

export default redirects