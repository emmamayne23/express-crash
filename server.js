import express from 'express';
import path from 'path'
import logger from './middleware/logger.js'
import { fileURLToPath } from 'url';
import errorHandler from './middleware/error.js'
import posts from './routes/posts.js'
const port = process.env.PORT || 8000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// logger middleware
app.use(logger)

// static server folder
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/api/posts', posts)

// error handlers
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`))