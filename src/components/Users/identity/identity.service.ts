import {
  badImplementationException,
  dataNotExistException,
  HttpException,
  invalidException,
} from "../../../utils/apiErrorHandler";
import { v4 as uuidv4 } from "uuid";
import { Transaction } from "sequelize";
import sequelizeConnection from "../../../models/db.connect";
import {
  addContract,
  getContract,
  getContractOptional,
  updateContractFields,
} from "../../../models/contract";
import {
  ContactDocument,
  NewContactDocument,
  UpdateContactDocument,
} from "../../../models/@types";
import { getContractExtract } from "../../../utils/getContract";

export const createContract = async (
  newContact: NewContactDocument,
  updateContact: ContactDocument,
  isBoth: boolean
) => {
  let error: Error | HttpException | undefined;
  const session: Transaction = await sequelizeConnection.transaction(); //TODO: transaction if failed rollback
  try {
    console.log("new contract", newContact);
    isBoth && updateContact.id
      ? await updateContractFields(
          updateContact.id,
          {
            linkPrecedence: "secondary",
            linkedId: newContact.linkedId,
          },
          session
        )
      : await addContract(newContact, session);

    await session.commit();
  } catch (err: any) {
    console.error(err);
    error = err instanceof Error ? err : badImplementationException(err);
    await session.rollback();

    return Promise.reject(error);
  } finally {
  }
  if (!error) {
    const getContracts = await getContractOptional(
      newContact.email,
      newContact.phoneNumber
    );

    const result = getContractExtract(getContracts);

    return Promise.resolve(result);
  }
};
