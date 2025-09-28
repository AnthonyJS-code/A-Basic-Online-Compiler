const express = require("express")
const compile = require("./Controllers/compile")
const app = express()

app.use(express.static("static"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/api/compile',compile)

app.listen(8080,()=>{
    console.log("Server Started at port 8080")
})