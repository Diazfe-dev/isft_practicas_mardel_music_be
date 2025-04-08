import express from 'express';
import envConfig from './src/config/envs';
import Server from "./src/server";
import AppRoutes from './src/presentation/routes/appRoutes';
import authRouter from './src/presentation/routes/auth/authRouter';
import userRouter from './src/presentation/routes/user/userRouter';
import calendarRouter from './src/presentation/routes/calendar/calendarRouter';

const routes = AppRoutes
    .getInstance()
    .setGlobalPrefix('/api/v1')
    .addRoutes('/auth', authRouter)
    .addRoutes('/user', userRouter)
    .addRoutes('/calendar', calendarRouter)
    .getRouter()

const server = Server
    .getInstance({ port: envConfig.port, routes })
    .use(express.json())
    .use(express.urlencoded({ extended: true }));


server.run();