import express from 'express';

import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import helmet from 'helmet';
import userRoute from './routes/userRoute.js'
import session from 'express-session';

dotenv.config();

const app = express();
const router = express.Router();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(helmet());


// session
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1800 * 1000, //30 mins
        secure: false,
        httpOnly: true
    }

}));

// using the routes
app.use('/api', userRoute);


const port = 3001 || process.env.PORT;


app.get('/' , (req, res) => {
    res.send('Hello Backend');
})

await connectDB();

app.listen(port, () => {
     console.log(`server started listening on port ${port}`)
})
