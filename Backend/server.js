import express from 'express';
import cors from 'cors';
import { hashSync, compareSync } from 'bcrypt';
import mongoose from 'mongoose';
import env from "dotenv";
import passport from 'passport'
import jwt from 'jsonwebtoken'
import userRoutes from './routes/userRoutes/userRoutes.js'


const app = express();
app.use(cors());
app.use(passport.initialize())
app.use(express.json())
env.config({ path: ".env" })
const uri = process.env.ATLAS_URI

app.use('/user', userRoutes)

mongoose.connect(uri);
mongoose.connection.once("open", () => {
    console.log("MongoDB conncetion established !!")
})

app.post('/save', (req, res) => {
    console.log(req.body)
    res.send('Saved')
})

app.listen(4000, () => {
    console.log("Server started on port - 4000 !! -----------------------------------------------------------------")
})