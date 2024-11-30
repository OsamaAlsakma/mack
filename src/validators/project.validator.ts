import { body } from 'express-validator';
import { ProjectType } from '@prisma/client';

export const validateProject = [
  body('title')
    .notEmpty()
    .withMessage('Title is required'),
  body('titleAr')
    .notEmpty()
    .withMessage('Arabic title is required'),
  body('description')
    .notEmpty()
    .withMessage('Description is required'),
  body('descriptionAr')
    .notEmpty()
    .withMessage('Arabic description is required'),
  body('type')
    .isIn(Object.values(ProjectType))
    .withMessage('Invalid project type'),
  body('budget')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Budget must be a positive number'),
  body('features')
    .isArray()
    .withMessage('Features must be an array'),
  body('technologies')
    .isArray()
    .withMessage('Technologies must be an array'),
];