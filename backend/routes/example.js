const express = require('express')
const app = express()

app.get('/api/data',(req,res) => {
    const data ={
        message: "Hello"
    }
    res.json(data)
})
app.listen(3005)