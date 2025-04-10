import { PaginationDto } from "../dto";
import { CreateUserDto } from "../dto/user/createUser.dto";
import UserSchema from "../models/user.schema.interface";
import BaseUserRepository from "../repository/user.repository.interface";
import ServiceBase from "./base.service.interface";

abstract class BaseUserService implements ServiceBase<BaseUserRepository> {
    constructor(repository: BaseUserRepository) { }

    abstract getAll(paginationDto: PaginationDto): Promise<{ meta: { page: number, limit: number, total: number }, data: UserSchema[] }>;
    abstract getById(id: string): Promise<UserSchema>;
    abstract create(data: CreateUserDto): Promise<UserSchema>;
    abstract update(id: string, data: Partial<UserSchema>): Promise<UserSchema>;
    abstract delete(id: string): Promise<boolean>;

}

export default BaseUserService;