import { Router } from "express";
import createBook from "../controllers/createBook";

const routes = Router();

routes.post('/', createBook);


export default routes;