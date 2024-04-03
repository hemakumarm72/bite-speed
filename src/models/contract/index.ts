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
export const getContractByEmail = async (email: string) => {
  try {
    const member = await Contract.findOne({
      where: {
        email,
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

export const addContract = async (data: NewContractDocument) => {
  try {
    const contract = await Contract.create(data);
    return Promise.resolve(contract);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateContractFields = async (
  id: string,
  data: UpdateContractDocument
) => {
  try {
    const member = await Contract.update(data, {
      where: {
        id,
      },
    });
    return Promise.resolve(member);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteContract = async (id: string) => {
  try {
    const member = await Contract.destroy({
      where: {
        id,
      },
    });
    return Promise.resolve(member);
  } catch (err) {
    return Promise.reject(err);
  }
};
