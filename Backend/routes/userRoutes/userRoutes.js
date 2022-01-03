const express = require('express')
const mongoose = require('mongoose')
express().use(express.json())

const router = express.Router()

router.post('/register', (req, res) => {
    console.log(req)
    res.send('Got it')
})