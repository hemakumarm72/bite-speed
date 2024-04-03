import {
  badImplementationException,
  dataNotExistException,
  HttpException,
  invalidException,
} from "../../../utils/apiErrorHandler";
import { v4 as uuidv4 } from "uuid";
import { Transaction } from "sequelize";
import sequelizeConnection from "../../../models/db.connect";
import { addContract, getContractOptional } from "../../../models/contract";
import { NewContractDocument } from "../../../models/@types";

export const createContract = async (contract: NewContractDocument) => {
  let error: Error | HttpException | undefined;
  const session: Transaction = await sequelizeConnection.transaction(); //TODO: transaction if failed rollback

  try {
    const isContract = await getContractOptional(
      contract.email,
      contract.phoneNumber
    );

    !isContract ? await addContract(contract, session) : null;

    await session.commit();
  } catch (err: any) {
    console.error(err);
    error = err instanceof Error ? err : badImplementationException(err);
    await session.rollback();

    return Promise.reject(error);
  } finally {
  }
  if (!error) {
    return Promise.resolve();
  }
};
