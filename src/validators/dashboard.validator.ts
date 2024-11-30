import { body } from 'express-validator';

export const validateHomeContent = [
  body('heroTitleAr').notEmpty().withMessage('Arabic hero title is required'),
  body('heroTitleEn').notEmpty().withMessage('English hero title is required'),
  body('heroSubtitleAr').notEmpty().withMessage('Arabic hero subtitle is required'),
  body('heroSubtitleEn').notEmpty().withMessage('English hero subtitle is required'),
  body('statsData').isArray().withMessage('Stats data must be an array'),
  body('processSteps').isArray().withMessage('Process steps must be an array'),
  body('solutions').isArray().withMessage('Solutions must be an array'),
  body('technologies').isArray().withMessage('Technologies must be an array'),
];

export const validateAboutContent = [
  body('visionAr').notEmpty().withMessage('Arabic vision is required'),
  body('visionEn').notEmpty().withMessage('English vision is required'),
  body('missionAr').notEmpty().withMessage('Arabic mission is required'),
  body('missionEn').notEmpty().withMessage('English mission is required'),
  body('statsData').isArray().withMessage('Stats data must be an array'),
  body('values').isArray().withMessage('Values must be an array'),
  body('expertise').isArray().withMessage('Expertise must be an array'),
  body('teamMembers').isArray().withMessage('Team members must be an array'),
];

export const validateSocialLink = [
  body('platform').notEmpty().withMessage('Platform is required'),
  body('url')
    .notEmpty().withMessage('URL is required')
    .isURL().withMessage('Invalid URL format'),
];