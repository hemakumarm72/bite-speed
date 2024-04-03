import { Model, Optional } from 'sequelize';
import sequelizeConnection from '../index';

export type NewContractDocument = {
  id?: string;
  phoneNumber?: string;
  email?: string
  linkedId?: number | null
  linkPrecedence: 'secondary' | 'primary';
  deletedAt?: Date | null;

};

export type UpdateContractDocument = {
  phoneNumber?: string;
  email?: string
  linkedId?: string | null
  linkPrecedence?: 'secondary' | 'primary';
  deletedAt?: Date | null;
};
