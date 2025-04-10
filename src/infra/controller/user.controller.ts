import { Request, response, Response } from "express";
import BaseUserService from "../../application/services/user.service.interface";
import BaseUserController from "../../application/controller/user.controller.interface";
import { PaginationDto, CreateUserDto, UpdateUserDto } from "../../application/dto";

class UserController implements BaseUserController {
    constructor(private readonly service: BaseUserService) { }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            //@ts-ignore
            const dto = req.validated as PaginationDto;
            const response = await this.service.getAll(dto);
            if (response) res.status(200).json(response);
            else res.status(404).json({ message: "Not found" });
        }
        catch (error) {

            console.error(error);
        }
    }

    async getById(req: Request, res: Response): Promise<void> {

        const id = req.params.id;

        try {
            const response = await this.service.getById(id);
            if (response) res.status(200).json(response);
            else res.status(404).json({ message: "Not found" });
        }
        catch (error) {

            console.error(error);
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            //@ts-ignore
            const dto = req.validated as CreateUserDto;

            const response = await this.service.create(dto);

            if (response) res.status(201).json(response);

            else res.status(400).json({ message: "Bad request" });

        } catch (error) {
            res.status(500).json({ message: `${error}` });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            //@ts-ignore
            const dto = req.validated as UpdateUserDto;
            const response = await this.service.update(id, dto);
            if (response) res.status(200).json(response);
            else res.status(404).json({ message: "Not found" });
        } catch (error) {
            console.error(error);
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const deleted = await this.service.delete(id);
            if (!deleted) res.status(404).json({ message: "Something went wrong deleting user" });
            else res.status(200).json({ message: "Deleted successfully" });
        } catch (error) {
            console.error(error);
        }
    }
}

export default UserController;