import { Model, Optional } from 'sequelize';
import sequelizeConnection from '../index';

export type NewMemberDocument = {
  id?: string;
  phoneNumber?: string;
  email?: string
  linkedId?: number | null
  linkPrecedence: 'secondary' | 'primary';
  deletedAt?: Date | null;

};

export type UpdateMemberDocument = {
  phoneNumber?: string;
  email?: string
  linkedId?: string | null
  linkPrecedence?: 'secondary' | 'primary';
  deletedAt?: Date | null;
};
