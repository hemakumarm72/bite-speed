import { Op, Transaction } from "sequelize";
import { paginate } from "../../utils/pagination";
import { NewContractDocument, UpdateContractDocument } from "../@types";
import Contract from "./contract.entity";

export const getContract = async () => {
  try {
    const member = await Contract.findAll();

    return Promise.resolve(member);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getContractWithFilter = async (limit: number, offset: number) => {
  try {
    //TODO: SQL Pagination function is create own
    const pagination = await paginate(
      Contract, // Model name
      {},
      offset,
      limit
    );

    return Promise.resolve(pagination);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const getContractOptional = async (
  email?: string,
  phoneNumber?: string
) => {
  try {
    const member = await Contract.findOne({
      where: {
        [Op.or]: [{ email }, { phoneNumber }],
      },
    });
    return Promise.resolve(member);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getContractByID = async (id?: string) => {
  try {
    const contract = await Contract.findByPk(id);
    return Promise.resolve(contract);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const addContract = async (
  data: NewContractDocument,
  session?: Transaction | undefined | null
) => {
  try {
    const contract = await Contract.create(data, { transaction: session });
    return Promise.resolve(contract);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateContractFields = async (
  id: string,
  data: UpdateContractDocument,
  session?: Transaction | undefined | null
) => {
  try {
    const member = await Contract.update(data, {
      where: {
        id,
      },
      transaction: session, // Pass transaction option
    });
    return Promise.resolve(member);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteContract = async (
  id: string,
  session?: Transaction | undefined | null
) => {
  try {
    const member = await Contract.destroy({
      where: {
        id,
      },
      transaction: session, // Pass transaction option
    });
    return Promise.resolve(member);
  } catch (err) {
    return Promise.reject(err);
  }
};
