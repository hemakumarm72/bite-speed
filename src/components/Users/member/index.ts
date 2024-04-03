import express from 'express';
import { checkSchema } from 'express-validator';

import { ADD_MEMBER, DELETE_MEMBER_SCHEMA, GET_SCHEMA_MEMBER, UPDATE_MEMBER_SCHEMA } from './member.validation';

import * as controller from './member.controller';
import { checkValidation } from '../../../utils/validation';

const router = express.Router();

router.post('/add', checkSchema(ADD_MEMBER), checkValidation, controller.addMembers);
router.get('/', checkSchema(GET_SCHEMA_MEMBER), checkValidation, controller.getMembers);
router.put('/:memberId/update', checkSchema(UPDATE_MEMBER_SCHEMA), checkValidation, controller.updateMember);
router.delete('/:memberId/delete', checkSchema(DELETE_MEMBER_SCHEMA), checkValidation, controller.deleteMembers);

export default router;
