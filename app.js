import express from 'express'
import connectDB from './db/connectDB.js'
import dotenv from 'dotenv'
import tasks from './/routes/tasks.js'
import notFound from './middleware/not-found.js'
import path from "path"
import { fileURLToPath } from "url"
import errorHandlerMiddleware from './middleware/error-handler.js'
dotenv.config()

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.json())

app.use(express.static(path.join(__dirname, "public")))

app.use('/api/v1/tasks', tasks)


app.use(notFound)
app.use(errorHandlerMiddleware)



const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => console.log(`server running on port ${PORT}...`))
    }
    catch(err){
        console.log(err)
    }
}
start()
