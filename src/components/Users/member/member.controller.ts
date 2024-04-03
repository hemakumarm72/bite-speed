import { Request, Response, NextFunction } from 'express';
import { deleteMember, getMemberwithfilter, updateMemberFields } from '../../../models/contract';
import { NewMemberDocument, UpdateMemberDocument } from '../../../models/@types';
import * as Service from './member.service';
import sequelizeConnection from '../../../models/db.connect';
import { Transaction } from 'sequelize';

export const addMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const data: NewMemberDocument = {
      name,
      email,
      password,
      role: 'General',
      refreshToken: null,
      deletedAt: null,
    };
    const t: Transaction = await sequelizeConnection.transaction(); //TODO: transaction if failed rollback

    await Service.Addmember(data, t);

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, offset } = req.query;
    const member = await getMemberwithfilter(Number(limit) | 0, Number(offset) | 0); // TODO: // with filter options
    return res.status(200).json({
      success: true,
      data: member,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const updateMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { memberId } = req.params;
    const { name, email, role } = req.body;
    const data: UpdateMemberDocument = {
      name,
      email,
      role,
    };
    await updateMemberFields(memberId, data);
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deleteMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { memberId } = req.params;
    await deleteMember(memberId);
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
