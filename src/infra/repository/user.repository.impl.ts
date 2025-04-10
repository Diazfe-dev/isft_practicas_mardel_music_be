import { Connection, ResultSetHeader } from "mysql2/promise";

import UserSchema from "../../application/models/user.schema.interface";
import UserRepositoryBase from "../../application/repository/user.repository.interface";

import { PaginationDto, CreateUserDto, UpdateUserDto } from "../../application/dto";

class UserRepository implements UserRepositoryBase {
    constructor(private readonly connection: Connection) { }

    public async getAll(paginationDto: PaginationDto): Promise<{ meta: { page: number, limit: number, total: number }, data: UserSchema[] }> {
        const { page = 1, limit = 10 } = paginationDto;
        const offset = (page - 1) * limit;

        const [data] = await this.connection.query<any[]>(
            "SELECT * FROM Users LIMIT ? OFFSET ?",
            [limit, offset]
        );

        const [[{ total }]] = await this.connection.query<any[]>(
            "SELECT COUNT(*) as total FROM Users"
        );

        return { meta: { page, limit, total }, data, };
    }

    public async getById(id: string): Promise<UserSchema> {
        const [rows] = await this.connection.query<any[]>("SELECT id, name, lastName, email, profilePicture, createdAt, updatedAt FROM Users WHERE id = ?", [id]);
        return rows[0];
    }

    private async getByEmail(email: string): Promise<UserSchema> {
        const [rows] = await this.connection.query<any[]>("SELECT id, name, lastName, email, profilePicture, createdAt, updatedAt FROM Users WHERE email = ?", [email]);
        return rows[0];
    }

    public async create(data: CreateUserDto): Promise<UserSchema> {
        const [result] = await this.connection.execute<any[]>(
            `INSERT INTO Users (name, lastName, email, password, profilePicture, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            [data.name, data.lastName, data.email, data.password, data.profilePicture]
        );

        if (!result) {
            throw new Error("Error creating user");
        }

        return await this.getByEmail(`${data.email}`);
    }

    public async update(id: string, data: UpdateUserDto): Promise<UserSchema> {
        const fields: string[] = [];
        const values: any[] = [];

        const entries = Object.entries(data);

        for (const [key, value] of entries) {
            if (value) {
                fields.push(`${key} = ?`);
                values.push(value);
            }
        }

        if (fields.length === 0) {
            throw new Error("No fields to update");
        }

        fields.push("updatedAt = NOW()");
        const query = `UPDATE Users SET ${fields.join(", ")} WHERE id = ?`;
        values.push(id);

        const [result] = await this.connection.execute(query, values);

        return await this.getById(id);
    }

    public async delete(id: string): Promise<boolean> {
        const [result] = await this.connection.execute<ResultSetHeader>("DELETE FROM Users WHERE id = ?", [id]);
        if (result.affectedRows! === 0) return false;
        return true;
    }
}

export default UserRepository;