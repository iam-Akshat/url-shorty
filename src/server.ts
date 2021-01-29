import express from "express";
import redirects from "./routes/Redirects";
import { createURL } from "./routes/CreateURL";
import { BatchCreate } from "./routes/BatchCreate";
import { dbConnect } from "./db/connectDb";
import dotenv from "dotenv";
import { join } from "path";

const port = process.env.PORT || 3000

dotenv.config({ path: join(__dirname, "../", ".env") })

const app = express()

//Config
app.set('view engine', 'ejs');

app.use(express.static(join(__dirname, '../', 'public')))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/', redirects)
app.use('/', createURL)
app.use('/batch',BatchCreate)

app.listen(port, async () => {
  const { MONGO_URI } = process.env
  if (MONGO_URI) {
    try {
      await dbConnect(MONGO_URI)
      return console.log(`server is listening on ${port}`);
    } catch (error) {
      return console.error("DB NOT CONNECTED")
    }

  }

  return console.error("DB NOT CONNECTED")
});