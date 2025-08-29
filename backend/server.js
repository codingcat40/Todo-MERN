import express from 'express';

import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());


const port = 3001 || process.env.PORT;




app.get('/' , (req, res) => {
    res.send('Hello Backend');
})

await connectDB();

app.listen(port, () => {
     console.log(`server started listening on port ${port}`)
})
