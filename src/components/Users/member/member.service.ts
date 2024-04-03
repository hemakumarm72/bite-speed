import {
  badImplementationException,
  dataNotExistException,
  HttpException,
  invalidException,
} from '../../../utils/apiErrorHandler';
import { v4 as uuidv4 } from 'uuid';
import { getAddToCurrentJST } from '../../../utils/dayjs';
import { NewMemberDocument } from '../../../models/@types';
import { addMember } from '../../../models/contract';
import { MESSAGE_ADD_MEMBER } from './member.message';
import { sendMessage } from '../../../utils/sgMailer';
import { Transaction } from 'sequelize';
import sequelizeConnection from '../../../models/db.connect';

export const Addmember = async (member: NewMemberDocument, session: Transaction) => {
  let error: Error | HttpException | undefined;

  try {
    await addMember(member);
    let tokenUrl = `${process.env.FRONTEND_ADMIN_URL}/login`;

    await sendMessage(MESSAGE_ADD_MEMBER(member.email, member.password, '登録する', tokenUrl));
    await session.commit();
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    error = err instanceof Error ? err : badImplementationException(err);
    await session.rollback();

    return Promise.reject(error);
  }
};
