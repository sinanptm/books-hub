import express from 'express';
import cors from 'cors';
import { CLIENT_URL, PORT } from './config';
import connectDb from './config/connectDB';
import routes from './routes';

const app = express();

app.use(cors({
    origin: [CLIENT_URL!, 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(PORT, () => {
    connectDb().then(() => {
        console.log("Server started on ", PORT);
    });
});