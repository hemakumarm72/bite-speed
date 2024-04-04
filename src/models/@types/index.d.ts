import { Model, Optional, Sequelize } from "sequelize";
import sequelizeConnection from "../index";

export type NewContactDocument = {
  id?: number;
  phoneNumber?: string;
  email?: string;
  linkedId?: number | null;
  linkPrecedence: "secondary" | "primary";
  deletedAt?: Date | null;
};

export type UpdateContactDocument = {
  id?: number;
  phoneNumber?: string;
  email?: string;
  linkedId?: number | null;
  linkPrecedence?: "secondary" | "primary";
  deletedAt?: Date | null;
};

export type ContactDocument = Model<NewContactDocument> & NewContactDocument;
