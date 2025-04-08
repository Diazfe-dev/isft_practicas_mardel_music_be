import { Router } from "express";

interface IAppRouter {
    setGlobalPrefix(prefix: string): this;
    addRoutes(prefix: string, router: Router): this;
    getRouter(): Router;
}

export default IAppRouter;