import { Model, ModelStatic } from 'sequelize';
import to from 'await-to-js';

export const paginate = async (model: ModelStatic<Model>, query: object, page: number, pageSize: number) => {
  const limit = pageSize ? +pageSize : 3;
  const offset = page ? page * limit : 0;

  const [errorTotal, totalRecords] = await to(model.count({ ...query }));
  if (errorTotal) {
    throw errorTotal;
  }
  const lastPage = totalRecords > 0 ? Math.floor(totalRecords / pageSize) : 0;
  let currentPage = page;
  const hasMorePages = currentPage < lastPage;
  const [error, results] = await to(
    model.findAll({
      ...query,
      offset,
      limit,
    }),
  );
  if (error) {
    throw error;
  }
  const result = { lastPage, totalRecords, currentPage, hasMorePages, results };
  return result;
};
