import { body } from 'express-validator';

export const validateExecutive = [
  body('nameAr')
    .notEmpty().withMessage('Arabic name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('nameEn')
    .notEmpty().withMessage('English name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('titleAr')
    .notEmpty().withMessage('Arabic title is required')
    .isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters'),
  
  body('titleEn')
    .notEmpty().withMessage('English title is required')
    .isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters'),
  
  body('quoteAr')
    .notEmpty().withMessage('Arabic quote is required')
    .isLength({ min: 10, max: 500 }).withMessage('Quote must be between 10 and 500 characters'),
  
  body('quoteEn')
    .notEmpty().withMessage('English quote is required')
    .isLength({ min: 10, max: 500 }).withMessage('Quote must be between 10 and 500 characters'),
];

export const validateExecutiveOrder = [
  body('newOrder')
    .notEmpty().withMessage('New order is required')
    .isInt({ min: 0 }).withMessage('Order must be a positive integer'),
];