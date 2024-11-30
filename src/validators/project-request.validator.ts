import { body } from 'express-validator';
import { ProjectRequestStatus } from '@prisma/client';

export const validateProjectType = [
  body('nameAr')
    .notEmpty().withMessage('Arabic name is required'),
  body('nameEn')
    .notEmpty().withMessage('English name is required'),
  body('iconName')
    .notEmpty().withMessage('Icon name is required'),
];

export const validateBudgetRange = [
  body('valueAr')
    .notEmpty().withMessage('Arabic value is required'),
  body('valueEn')
    .notEmpty().withMessage('English value is required'),
  body('minAmount')
    .notEmpty().withMessage('Minimum amount is required')
    .isFloat({ min: 0 }).withMessage('Minimum amount must be a positive number'),
  body('maxAmount')
    .optional()
    .isFloat({ min: 0 }).withMessage('Maximum amount must be a positive number'),
];

export const validateTimeline = [
  body('valueAr')
    .notEmpty().withMessage('Arabic value is required'),
  body('valueEn')
    .notEmpty().withMessage('English value is required'),
  body('months')
    .notEmpty().withMessage('Number of months is required')
    .isInt({ min: 1 }).withMessage('Months must be a positive integer'),
];

export const validateProjectRequest = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\+?[\d\s-]+$/).withMessage('Invalid phone number format'),
  body('company')
    .optional()
    .isLength({ max: 100 }).withMessage('Company name must not exceed 100 characters'),
  body('projectType')
    .notEmpty().withMessage('Project type is required'),
  body('budget')
    .notEmpty().withMessage('Budget range is required'),
  body('timeline')
    .notEmpty().withMessage('Timeline is required'),
  body('description')
    .notEmpty().withMessage('Project description is required')
    .isLength({ min: 50, max: 2000 }).withMessage('Description must be between 50 and 2000 characters'),
];