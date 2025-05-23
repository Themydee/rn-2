import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { DB } from './db/config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cors());

app.get('/', (req,res)=> {
    res.send('Hllo World')
})

app.listen(PORT, ()=> {
    DB();
    console.log("Server is running");
})