import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../types";

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    const message = error instanceof Error ? error.message : "Unknown error occurred";

    res.status(StatusCode.InternalServerError).json({ message });
};

export default errorHandler;