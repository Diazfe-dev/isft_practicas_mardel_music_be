import express from 'express';
import Server from "../../infra/server/server";

interface ServerConfig {
    port: number;
    routes: express.Router
}
export default async function createServerApp({ port, routes }: ServerConfig): Promise<Server> {
    const server = Server.getInstance({ port, routes })
    return server;
}