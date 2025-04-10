import { Router } from "express";


abstract class AppRouter {
    protected readonly router: Router;

    constructor() {
        this.router = Router();
    }

    setGlobalPrefix(prefix: string): this {
        this.router.use(prefix, this.router);
        return this;
    }

    addRoutes(prefix: string, router: Router): this {
        this.router.use(prefix, router);
        return this;
    }

    getRouter(): Router {
        return this.router;
    }
}

export default AppRouter;