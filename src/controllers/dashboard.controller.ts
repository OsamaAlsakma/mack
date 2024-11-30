import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { ApiError } from '../utils/ApiError';

// Dashboard Statistics
export const getDashboardStats = async (req: Request, res: Response) => {
  const [
    projectsCount,
    servicesCount,
    executivesCount,
    socialLinksCount
  ] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.executiveQuote.count(),
    prisma.socialLink.count()
  ]);

  res.json({
    projectsCount,
    servicesCount,
    executivesCount,
    socialLinksCount
  });
};

// Home Page Content Management
export const getHomeContent = async (req: Request, res: Response) => {
  const content = await prisma.homeContent.findFirst();
  if (!content) {
    throw new ApiError(404, 'Home content not found');
  }
  res.json(content);
};

export const updateHomeContent = async (req: Request, res: Response) => {
  const {
    heroTitleAr,
    heroTitleEn,
    heroSubtitleAr,
    heroSubtitleEn,
    statsData,
    processSteps,
    solutions,
    technologies
  } = req.body;

  const content = await prisma.homeContent.upsert({
    where: { id: '1' }, // Assuming single record
    update: {
      heroTitleAr,
      heroTitleEn,
      heroSubtitleAr,
      heroSubtitleEn,
      statsData,
      processSteps,
      solutions,
      technologies
    },
    create: {
      id: '1',
      heroTitleAr,
      heroTitleEn,
      heroSubtitleAr,
      heroSubtitleEn,
      statsData,
      processSteps,
      solutions,
      technologies
    }
  });

  res.json(content);
};

// About Page Content Management
export const getAboutContent = async (req: Request, res: Response) => {
  const content = await prisma.aboutContent.findFirst();
  if (!content) {
    throw new ApiError(404, 'About content not found');
  }
  res.json(content);
};

export const updateAboutContent = async (req: Request, res: Response) => {
  const {
    visionAr,
    visionEn,
    missionAr,
    missionEn,
    statsData,
    values,
    expertise,
    teamMembers
  } = req.body;

  const content = await prisma.aboutContent.upsert({
    where: { id: '1' },
    update: {
      visionAr,
      visionEn,
      missionAr,
      missionEn,
      statsData,
      values,
      expertise,
      teamMembers
    },
    create: {
      id: '1',
      visionAr,
      visionEn,
      missionAr,
      missionEn,
      statsData,
      values,
      expertise,
      teamMembers
    }
  });

  res.json(content);
};

// Social Links Management
export const getSocialLinks = async (req: Request, res: Response) => {
  const links = await prisma.socialLink.findMany({
    orderBy: { order: 'asc' }
  });
  res.json(links);
};

export const addSocialLink = async (req: Request, res: Response) => {
  const { platform, url } = req.body;

  const link = await prisma.socialLink.create({
    data: {
      platform,
      url,
      order: await getNextOrder('socialLink')
    }
  });

  res.status(201).json(link);
};

export const updateSocialLink = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { platform, url } = req.body;

  const link = await prisma.socialLink.update({
    where: { id },
    data: { platform, url }
  });

  res.json(link);
};

export const deleteSocialLink = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.socialLink.delete({ where: { id } });
  res.status(204).send();
};

// Helper function to get next order number
async function getNextOrder(model: 'socialLink') {
  const lastItem = await prisma[model].findFirst({
    orderBy: { order: 'desc' }
  });
  return (lastItem?.order ?? -1) + 1;
}