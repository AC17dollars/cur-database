import express from "express";
// import tedious from "tedious";
import pg from "pg";
import dotenv from 'dotenv';
// import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use( express.static('../frontend' ));
// app.use(cors());

let client = new pg.Client(process.env.DB_URI);
client.connect((err)=>{
    if(err){
        return console.error("Couldn't connect to DB Server.");
    }
    console.log("Connected")
});


app.get("/api/table", async (req, res)=>{
    let result = await client.query("select * from \"tbl_Student\";");
    res.json(result.rows);

})
app.get("/", async (req, res)=>{
    res.sendFile('../frontend/index.html')
})

app.listen(process.env.PORT,
    () => {
        console.log(`Server started @${process.env.PORT}`);
    }
);
