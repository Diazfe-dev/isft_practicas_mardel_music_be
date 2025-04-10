import { Router } from 'express'
import UserRepository from '../../../infra/repository/user.repository.impl';
import UserService from '../../../infra/services/user.service.impl';
import UserController from '../../../infra/controller/user.controller';
import { validateDto } from '../../../infra/middlewares/validate.dto.middleware';
import { PaginationDto, CreateUserDto, UpdateUserDto } from '../../../application/dto';


import Mysql from '../../../infra/database/mysql';

export default async function createUserRouter(): Promise<Router> {
    const router = Router();

    const connection = Mysql.getConnection();
    const userRepository = new UserRepository(connection);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    router.get('/getAll', validateDto(PaginationDto, "query"), async (req, res) => await userController.getAll(req, res));
    router.get('/getById/:id', async (req, res) => await userController.getById(req, res));
    router.post('/create', validateDto(CreateUserDto), async (req, res) => await userController.create(req, res));
    router.put('/update/:id', validateDto(UpdateUserDto), async (req, res) => await userController.update(req, res));
    router.delete('/delete/:id', async (req, res) => await userController.delete(req, res));

    return router;
}