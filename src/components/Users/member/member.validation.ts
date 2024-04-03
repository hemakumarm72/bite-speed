import {
  VALIDATION_PASSWORD_CHECK,
  VALIDATION_NUMBER,
  VALIDATION_PASSWORD,
  VALIDATION_STRING,
  VALIDATION_EMAIL_NOT_EXIST,
  VALIDATION_EMAIL_EXIST,
  VALIDATION_MEMBERID,
} from '../../../constants/validation';

import { Schema } from 'express-validator';

export const ADD_MEMBER: Schema = {
  name: VALIDATION_STRING('body'),
  email: VALIDATION_EMAIL_NOT_EXIST('body'),
  password: VALIDATION_PASSWORD('body'),
};

export const UPDATE_MEMBER_SCHEMA: Schema = {
  memberId: VALIDATION_MEMBERID('params'),
  name: VALIDATION_STRING('body'),
  email: VALIDATION_STRING('body'),
};

export const DELETE_MEMBER_SCHEMA: Schema = {
  memberId: VALIDATION_MEMBERID('params'),
};

export const GET_SCHEMA_MEMBER: Schema = {
  limit: VALIDATION_NUMBER('query'),
  offset: VALIDATION_NUMBER('query'),
};
