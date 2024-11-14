import express from 'express';
import cors from 'cors';
import { CLIENT_URL, PORT } from './config';
import connectDb from './config/connectDB';

const app = express();

app.use(cors({
    origin: CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/", (req, res) => {
    res.sendStatus(200);
});

app.listen(PORT, () => {
    connectDb().then(() => {
        console.log("Server started on ", PORT);
    });
});