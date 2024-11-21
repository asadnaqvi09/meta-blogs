import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fileupload from 'express-fileupload';
import userRouter from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const port = process.env.PORT;
const MongoUri = process.env.MONGO_URI;

// Middleware to parse JSON bodies
app.use(cookieParser());
app.use(express.json());

app.use(fileupload({
    useTempFiles: true,
    createParentPath: true,
    limits: { fileSize: 1000 } //1mb
}))

//Connecting Database
try {
    mongoose.connect(MongoUri);
    console.log("Connected to MongoDB")
} catch (error) {
    console.log(error)
}

//Definnig Router
app.use('/api/user', userRouter);
app.use('/api/blogs', blogRouter);


app.listen(port, () => {
    console.log(`Server is running on ${port}`)
});