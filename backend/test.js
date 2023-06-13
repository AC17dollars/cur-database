import pg from "pg";
import dotenv from 'dotenv';
dotenv.config();

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
        return console.error("Couldn't Connect to Database. Check your Connection Credentials.");
    }
    console.log("Database Connection Successful")
    process.exit();
});

