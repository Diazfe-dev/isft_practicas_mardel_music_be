import { Request, Response, NextFunction, RequestHandler } from "express";

type DtoSource = "body" | "query";

export function validateDto<T>(DtoClass: new (data: any) => T, source: DtoSource = "body"): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {

        const raw = source === "query" ? req.query : req.body;

        const dto = new DtoClass(raw);

        const errors = typeof (dto as any).validate === "function"
            ? (dto as any).validate()
            : [];

        if (errors.length > 0) {
            res.status(400).json({ message: "Validation failed", errors });
            return;
        }

        (req as any).validated = dto;

        next();
    };
}
