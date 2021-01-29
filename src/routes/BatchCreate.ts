import { Router } from "express";
import { IBatchLink, BatchLink } from "../models/BatchLink";
import { ILink, createLinkHelper, Link } from "../models/Link";
import { isValidUrl } from "../helpers/ValidateUrl";
import { isEmptyStrings } from "../helpers/CheckEmptyStrings";
const BatchCreate = Router()

BatchCreate.post('/', async (req, res) => {
    const { batch_name, batch_url, tags } = req.body
    console.log(batch_name,batch_url,tags);
    
    // checks incoming parameters are strings are not
    if (typeof (batch_name) == "string" && typeof (batch_url) == "string" && typeof (tags) == "string") {
        console.log("not string");
        console.log(typeof (batch_name) == "string");
        console.log(typeof (batch_url) == "string");
        console.log(typeof (tags) == "string");
        
        if (isEmptyStrings([batch_name, batch_url, tags]) != true) {
            console.log("Empty");
            res.json({ "error": "Invalid data" })
        } else {
            const tags_arr = tags.split(",")
            const batch: IBatchLink = await BatchLink.create({
                batch_name,
                batch_url
            })
            await batch.save()
            const saved_links : Promise<ILink>[] = []
            tags_arr.forEach(async (tag)=>{
                console.log(tag);
                saved_links.push(createLinkHelper(batch.batch_url,tag,batch.id))
                return
            })
            const saved = await Promise.all(saved_links)
            batch.urls = saved
            await batch.save()         
            res.json(batch.toJSON())
        }
    } else {
        res.json({ "error": "Invalid data" })
        console.log("Empty");
    }
})

export { BatchCreate }