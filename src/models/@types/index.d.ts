import { Model, Optional } from 'sequelize';
import sequelizeConnection from '../index';

export type NewContractDocument = {
  id?: number;
  phoneNumber?: string;
  email?: string
  linkedId?: number | null
  linkPrecedence: 'secondary' | 'primary';
  deletedAt?: Date | null;

};

export type UpdateContractDocument = {
  id?: number
  phoneNumber?: string;
  email?: string
  linkedId?: number | null
  linkPrecedence?: 'secondary' | 'primary';
  deletedAt?: Date | null;
};
