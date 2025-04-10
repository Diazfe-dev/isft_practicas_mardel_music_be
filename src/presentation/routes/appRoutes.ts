import AppRouterImpl from '../../infra/routes/app.routes';
import AppRouter from '../../application/routes/appRouter.interface';

export default async function createAppRoutes(): Promise<AppRouter> {
    const appRoutes = AppRouterImpl.getInstance();
    return appRoutes;
}