import { CreateUserDto, UpdateUserDto, PaginationDto } from "../dto";

import UserSchema from "../models/user.schema.interface";
import BaseRepository from "./base.repository.interface";

abstract class BaseUserRepository extends BaseRepository<UserSchema> {

    abstract getAll(paginationDto: PaginationDto): Promise<{ meta: { page: number, limit: number, total: number }, data: UserSchema[] }>;
    abstract getById(id: string): Promise<UserSchema>;
    abstract create(data: CreateUserDto): Promise<UserSchema>;
    abstract update(id: string, data: UpdateUserDto): Promise<UserSchema>;
    abstract delete(id: string): Promise<boolean>;
}


export default BaseUserRepository;