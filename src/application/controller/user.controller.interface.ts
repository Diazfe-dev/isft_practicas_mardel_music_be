import BaseController from "./base.controller.interface";
import BaseUserService from "../services/user.service.interface";

abstract class BaseUserController extends BaseController<BaseUserService> { }

export default BaseUserController;