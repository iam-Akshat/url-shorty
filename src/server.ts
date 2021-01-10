import express from "express";
import redirects from "./routes/Redirects";
import { dbConnect } from "./db/connectDb";
import dotenv from "dotenv";

dotenv.config({path:'E:/url-short/.env'})
const app = express()
const port  = process.env.PORT || 3000
app.use('/',redirects)
app.listen(port, async () => {
    await dbConnect(process.env.MONGO_URI!)
    return console.log(`server is listening on ${port}`);
  });