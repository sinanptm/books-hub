import { Router } from "express";
import createBook from "../controllers/createBook";
import getBooks from "../controllers/getBooks";
import errorHandler from "../middleware/errorHandler";
import deleteBook from "../controllers/deleteBook";

const routes = Router();

routes.route('/')
    .post(createBook)
    .get(getBooks);
routes.delete('/:id', deleteBook);

routes.use(errorHandler);

export default routes;