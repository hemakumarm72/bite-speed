import { Op, Transaction } from "sequelize";
import { paginate } from "../../utils/pagination";
import {
  ContactDocument,
  NewContactDocument,
  UpdateContactDocument,
} from "../@types";
import Contract from "./contact.entity";
import { JsonObject } from "swagger-ui-express";

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
    const member = await Contract.findAll({
      where: {
        [Op.or]: [email ? { email } : {}, phoneNumber ? { phoneNumber } : {}],
      },
      order: [
        ["linkPrecedence", "ASC"], // Sort by linkPrecedence in ascending order
      ],
    });
    return Promise.resolve(member);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getContractByEmail = async (email?: string) => {
  try {
    const member = await Contract.findOne({
      where: {
        email,
      },
      order: [
        ["createdAt", "ASC"], // Sort by linkPrecedence in ascending order
      ],
    });
    return Promise.resolve(member);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getContractByPhoneNo = async (phoneNumber?: string) => {
  try {
    const member = await Contract.findOne({
      where: {
        phoneNumber,
      },
      order: [
        ["createdAt", "ASC"], // Sort by linkPrecedence in ascending order
      ],
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
  data: NewContactDocument,
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
  id: number,
  data: UpdateContactDocument,
  session?: Transaction | undefined | null
) => {
  try {
    const member = await Contract.update(data, {
      where: {
        id,
        linkPrecedence: "primary",
      },
      transaction: session, // Pass transaction option
    });
    return Promise.resolve(member);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateContractMany = async (
  id: string[],
  data: UpdateContactDocument,
  session?: Transaction | undefined | null
) => {
  try {
    await Contract.update(
      data, // Update values
      {
        where: {
          id: id, // Condition to match userId 1 or userId 2
        },
        transaction: session, // Pass transaction option
      }
    );

    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
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
