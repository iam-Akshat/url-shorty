import express from "express";
import redirects from "./routes/Redirects";
import { createURL } from "./routes/CreateURL";
import { dbConnect } from "./db/connectDb";
import dotenv from "dotenv";
import { join } from "path";

const port  = process.env.PORT || 3000

dotenv.config({path:'E:/url-short/.env'})

const app = express()

//Config
app.set('view engine', 'ejs');

app.use(express.static(join(__dirname,'../', 'public')))
app.use(express.urlencoded({extended:true}))

// Routes
app.use('/',redirects)
app.use('/',createURL)

app.listen(port, async () => {
    await dbConnect(process.env.MONGO_URI!)
    return console.log(`server is listening on ${port}`);
  });