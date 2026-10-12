import express from "express"

const app = express();
const port:number =  3000;


app.get("/healthcheck", (req,res)=>{
    res.send(`health is ok`).status(200)
})
app.listen(port,() => {
    console.log(`server started at port: ${port}`)
})