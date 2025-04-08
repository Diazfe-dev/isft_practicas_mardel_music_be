import { RequestHandler } from "express";

interface IServer {
    use(middleware: RequestHandler): this;
    run(): Promise<void>;
}

export default IServer;