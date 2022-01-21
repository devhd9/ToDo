import express from 'express';
import cors from 'cors';
import mysql from 'mysql'
import env from "dotenv";


const app = express();
app.use(cors());
app.use(express.json())
env.config({ path: ".env" })

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'sampleDB',
})

connection.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Connected')
    }
})
// Read List
app.get('/list', (req, res) => {
    connection.query('SELECT * FROM to_do_list', (error, rows, fields) => {
        if (error) { console.log(error.message); res.status(500).send(error.message) }
        else {
            res.status(200).json(rows)
        }
    })
})

// Create List-Item
app.post('/list', (req, res) => {
    const itemName = req.body.itemName
    console.log(itemName)
    connection.query(`INSERT INTO TO_DO_LIST (id,Name) VALUES(UUID(),?)`, [itemName], (error, rows, fields) => {
        if (error) { console.log(error.message); res.status(500).send(error.message) }
        else {
            connection.query('SELECT * FROM to_do_list', (error, rows, fields) => {
                if (error) { console.log(error.message); res.status(500).send(error.message) }
                else {
                    res.status(201).send(rows)
                }
            })
        }
    })
})
// Update List-Item
app.put('/list/:id', (req, res) => {
    const newName = req.body.newName
    console.log(newName);

    const id = req.params.id
    connection.query('UPDATE TO_DO_LIST SET NAME=? WHERE ID=?', [newName, id], (error, rows, fields) => {
        if (error) { console.log(error.message); res.status(500).send(error.message) }
        else {
            connection.query('SELECT * FROM to_do_list', (error, rows, fields) => {
                if (error) { console.log(error.message); res.status(500).send(error.message) }
                else {
                    res.status(200).send(rows)
                }
            })
        }
    })
})
// Delete List-Item
app.delete('/list/:id', (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM TO_DO_LIST WHERE ID=?', [id], (error, rows, fields) => {
        if (error) console.log(error.message)
        else {
            connection.query('SELECT * FROM to_do_list', (error, rows, fields) => {
                if (error) { console.log(error.message); res.status(500).send(error.message) }
                else {
                    res.status(200).send(rows)
                }
            })
        }
    })
})
app.listen(4000, () => {
    console.log("Server started on port - 4000 !! -----------------------------------------------------------------")
})