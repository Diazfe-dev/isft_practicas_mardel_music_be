import BaseService from "../services/base.service.interface";
import BaseRepository from "../repository/base.repository.interface";
import BaseSchema from "../models/base.schema.interface";

abstract class BaseController<TService = BaseService<BaseRepository<BaseSchema>>> { }

export default BaseController;