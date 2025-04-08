import express, { Router, RequestHandler } from "express";
import IServer from "./application/server/server.interface";

class Server implements IServer {

    private static instance: Server | null = null;

    public readonly app = express();

    private port: number;

    private middlewares: RequestHandler[] = [];

    private routes: Router;

    private constructor({ port, routes }: { port: number; routes: Router }) {
        this.port = port;
        this.routes = routes;
    }

    public static getInstance({ port, routes }: { port: number; routes: Router }): Server {
        if (!this.instance) {
            this.instance = new Server({ port, routes });
        }
        return this.instance;
    }

    public use(middleware: RequestHandler): this {
        this.middlewares.push(middleware);
        return this;
    }

    public async run(): Promise<void> {
        this.middlewares.forEach((middleware) => this.app.use(middleware));
        this.app.use(this.routes);
        this.app.listen(this.port, () => {
            console.log(`🚀 Server running on port ${this.port}`);
        });
    }
}

export default Server;
