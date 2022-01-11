import express from 'express';
import mongoose from 'mongoose';
express().use(express.json())

const router = express.Router()

console.log('object')
router.post('/register', (req, res) => {
    console.log(req.body)
    res.send('Got it')
})

export default router