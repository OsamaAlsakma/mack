import { body } from 'express-validator';

export const validateService = [
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
  body('icon')
    .notEmpty()
    .withMessage('Icon is required'),
  body('features')
    .isArray()
    .withMessage('Features must be an array')
    .notEmpty()
    .withMessage('At least one feature is required'),
];