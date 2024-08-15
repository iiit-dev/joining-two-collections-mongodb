import mongoose from "mongoose";
import express from 'express'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import authorRouter from "./Express/Routes/author-route.js";
import bookRouter from "./Express/Routes/book-route.js";
const app = express()
const port=8080
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use('/api/books', bookRouter)
app.use('/api/authors', authorRouter)
app.use(
    (err, req, res, next) => {
        const errorStatus = err.status || 500
        const errorMsg = err.message || 'Something Went Wrong'
        return res.status(500).json({
            success: false,
            status: errorStatus,
            message: errorMsg,
            stack: err.stack
        })
    }
)
mongoose.connect('mongodb+srv://riteshraj10241089:0Bh00uZi2XPTuPpB@cluster0.rf2gy3r.mongodb.net/sample-books').then(
    () => {
        console.log('connected to backend')
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    }
).catch(
    (err) => {
        console.log('error occured',err)
    }
)