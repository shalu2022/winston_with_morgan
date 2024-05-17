const express = require("express")
const morgan = require("morgan")
const logger = require("./logger")


const app = express()

const PORT = 5000

morgan.format(
    "formatType",
    '[:date[clf]] ":method :url"-"Status":status :remote-addr :remote-user :res[content-length] - "Response-Timing" :response-time ms'
  );
  app.use(
    morgan("formatType", {
        stream: logger.stream
    })
 );

 app.get("/", (req, res)=>{
    res.json({message:"this is get API"})
 })
 app.post("/user", (req, res)=>{
    res.json({message:"this is post API"})
 })

app.listen(PORT, ()=>{
    console.log(`PORT is listening at ${PORT}`)
})