import { body } from 'express-validator';

export const validateJob = [
  body('titleAr').notEmpty().withMessage('Arabic title is required'),
  body('titleEn').notEmpty().withMessage('English title is required'),
  body('departmentAr').notEmpty().withMessage('Arabic department is required'),
  body('departmentEn').notEmpty().withMessage('English department is required'),
  body('locationAr').notEmpty().withMessage('Arabic location is required'),
  body('locationEn').notEmpty().withMessage('English location is required'),
  body('type').isIn(['FULL_TIME', 'PART_TIME', 'CONTRACT']).withMessage('Invalid job type'),
  body('experience').notEmpty().withMessage('Experience is required'),
  body('descriptionAr').notEmpty().withMessage('Arabic description is required'),
  body('descriptionEn').notEmpty().withMessage('English description is required'),
  body('requirementsAr').isArray().withMessage('Arabic requirements must be an array'),
  body('requirementsEn').isArray().withMessage('English requirements must be an array'),
  body('benefitsAr').isArray().withMessage('Arabic benefits must be an array'),
  body('benefitsEn').isArray().withMessage('English benefits must be an array'),
  body('skills').isArray().withMessage('Skills must be an array'),
  body('salary').optional().isObject().withMessage('Invalid salary format'),
  body('featured').optional().isBoolean(),
  body('active').optional().isBoolean()
];

export const validateApplication = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').matches(/^\+?[\d\s-]+$/).withMessage('Valid phone number is required'),
  body('coverLetter').notEmpty().withMessage('Cover letter is required')
];