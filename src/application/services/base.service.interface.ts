import RepositoryBase from "../repository/base.repository.interface";
import SchemaBase from "../models/base.schema.interface";

abstract class BaseService<TRepository = RepositoryBase<SchemaBase>> {}

export default BaseService;