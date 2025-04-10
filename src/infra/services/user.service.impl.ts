import { CreateUserDto, PaginationDto, UpdateUserDto } from "../../application/dto";
import UserSchema from "../../application/models/user.schema.interface";
import BaseUserRepository from "../../application/repository/user.repository.interface";
import BaseUserService from "../../application/services/user.service.interface";

class UserService implements BaseUserService {
    constructor(private readonly repository: BaseUserRepository) { }

    getAll(paginationDto: PaginationDto): Promise<{ meta: { page: number, limit: number, total: number }, data: UserSchema[] }> {
        return this.repository.getAll(paginationDto);
    }

    getById(id: string): Promise<UserSchema> {
        return this.repository.getById(id);
    }

    async create(data: CreateUserDto): Promise<UserSchema> {
        return this.repository.create(data);
    }

    update(id: string, data: UpdateUserDto): Promise<UserSchema> {
        return this.repository.update(id, data);
    }

    delete(id: string): Promise<boolean> {
        return this.repository.delete(id);
    }

}

export default UserService;