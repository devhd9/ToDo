import express from 'express';
import cors from 'cors';
import { hashSync, compareSync } from 'bcrypt';
import mongoose from 'mongoose';
import env from "dotenv";
import passport from 'passport'
import jwt from 'jsonwebtoken'



const app = express();
app.use(cors());
env.config({ path: ".env" })
const uri = process.env.ATLAS_URI
app.use(express.json())
app.use(passport.initialize())

mongoose.connect(uri);
mongoose.connection.once("open", () => {
    console.log("MongoDB conncetion established !!")
})


app.listen(4000, () => {
    console.log("Server started on port - 4000 !! -----------------------------------------------------------------")
})