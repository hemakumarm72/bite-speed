import { Member } from '..';
import { paginate } from '../../utils/pagination';
import { NewMemberDocument, UpdateMemberDocument } from '../@types';

export const getMember = async () => {
  try {
    const member = await Member.findAll({
      attributes: { exclude: ['password', 'refreshToken'] },
    });

    return Promise.resolve(member);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getMemberwithfilter = async (limit: number, offset: number) => {
  try {
    //TODO: SQL Pagination function is create own
    const pagination = await paginate(
      Member, // Model name
      {
        attributes: {
          exclude: ['password', 'refreshToken'],
        }, // query, where .. etc
      },
      offset,
      limit,
    );

    return Promise.resolve(pagination);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const getMemeberByEmail = async (email: string) => {
  try {
    const member = await Member.findOne({
      where: {
        email,
      },
    });
    return Promise.resolve(member);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getMemberByID = async (memberId?: string) => {
  try {
    const member = await Member.findByPk(memberId);
    return Promise.resolve(member);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const addMember = async (data: NewMemberDocument) => {
  try {
    const member = await Member.create(data);
    return Promise.resolve(member);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateMemberFields = async (memberId: string, data: UpdateMemberDocument) => {
  try {
    const member = await Member.update(data, {
      where: {
        id: memberId,
      },
    });
    return Promise.resolve(member);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteMember = async (memberId?: string) => {
  try {
    const member = await Member.destroy({
      where: {
        id: memberId,
      },
    });
    return Promise.resolve(member);
  } catch (err) {
    return Promise.reject(err);
  }
};
