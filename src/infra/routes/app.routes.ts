import { Router } from "express";
import AppRouter from "../../application/routes/appRouter.interface";

interface RouteEntry {
    prefix?: string;
    router: Router;
};

class AppRouterImpl extends AppRouter {
    private static instance: AppRouterImpl | null = null;
    private readonly mainRouter: Router;
    private globalPrefix: string = "";
    private routes: RouteEntry[] = [];

    private constructor() {
        super();
        this.mainRouter = Router();
    }

    public static getInstance(): AppRouterImpl {
        if (this.instance === null) {
            this.instance = new AppRouterImpl();
        }
        return this.instance;
    }

    public setGlobalPrefix(prefix: string): this {
        this.globalPrefix = prefix.startsWith("/") ? prefix : `/${prefix}`;
        return this;
    }

    public addRoutes(prefix = "/", router: Router): this {
        this.routes.push({ prefix, router });
        return this;
    }

    public getRouter(): Router {
        this.routes.forEach(({ prefix, router }) => {
            const fullPath = this.globalPrefix + (prefix === "/" ? "" : prefix);
            this.mainRouter.use(fullPath, router);
        });

        return this.mainRouter;
    }
}


export default AppRouterImpl;