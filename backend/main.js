import express from "express";
import pg from "pg";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('../frontend'));


let client = new pg.Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: true,
  });
client.connect((err) => {
    if (err) {
        console.error(err);
        return console.error("Couldn't connect to DB Server.");
    }
    console.log("Connected")
});


app.get("/api/table", async (req, res) => {
    try {
        let result = await client.query("select * from \"tbl_Student\";");
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
    }
})

app.get("/", (req, res) => {
    res.sendFile('/frontend/index.html', { 'root': '../' });
})

app.get("/favicon.ico", (req, res) => {
    res.sendFile('/images/favicon.ico', { 'root': '../' });
})

app.post("/insert", async (req, res) => {
    res.redirect("/");
    try {
        await client.query(`insert into "tbl_Student" values('${req.body.name}', '${req.body.roll}', '${req.body.phone}', '${req.body.dob}', '${req.body.address}');`);
    }
    catch (err) {
        console.error(err);
    }
});

app.listen(process.env.PORT,
    () => {
        console.log(`Server started @${process.env.PORT}`);
    }
);
