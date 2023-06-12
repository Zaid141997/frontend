
const express = require('express')
const dotenv =  require('dotenv').config()
const port =  process.env.port || 3002
const app =  express()
app.listen(port)