import express from 'express'
import Mysql from './src/infra/database/mysql';

import envConfig from './src/config/envs';
import createServerApp from './src/presentation/server';
import createAppRoutes from './src/presentation/routes/appRoutes';
import createUserRouter from './src/presentation/routes/user/user.router';

(async () => {
    try {
        const db = await Mysql.getInstance(envConfig.mysql);
        
        await db.connect();

        const appRoutes = await createAppRoutes();
        
        appRoutes.setGlobalPrefix('/api/v1');
        
        appRoutes.addRoutes('/users', await createUserRouter());

        const server = await createServerApp({ port: envConfig.port, routes: appRoutes.getRouter() });
        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));
        await server.run();

    }
    catch (err) {
        console.log(err);
    }
})();