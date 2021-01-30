import { Router } from "express";
import { validateShortUrl } from "../helpers/ValidateShortUrl";
import { Link, ILink } from "../models/Link";
const report: Router = Router()

report.get('/:short_url', async(req, res) => {
    const { short_url } = req.params
    if (validateShortUrl(short_url)) {
        const report_obj:ILink = await Link.findOne({short_url}) 
        if(report_obj==undefined){
            return res.status(404).json({ 'message': 'not found' })
        }
        return res.status(200).render('report',{report:report_obj,host:req.hostname})
    } else {
        return res.status(404).json({ 'message': 'not found' })
    }
})
export { report }