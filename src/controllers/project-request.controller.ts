import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { ApiError } from '../utils/ApiError';
import { sendProjectRequestEmail } from '../services/email.service';

// Project Types Management
export const getProjectTypes = async (req: Request, res: Response) => {
  const types = await prisma.projectType.findMany({
    orderBy: { order: 'asc' }
  });
  res.json(types);
};

export const addProjectType = async (req: Request, res: Response) => {
  const { nameAr, nameEn, iconName } = req.body;

  const type = await prisma.projectType.create({
    data: {
      nameAr,
      nameEn,
      iconName,
      order: await getNextOrder('projectType')
    }
  });

  res.status(201).json(type);
};

export const updateProjectType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nameAr, nameEn, iconName } = req.body;

  const type = await prisma.projectType.update({
    where: { id },
    data: { nameAr, nameEn, iconName }
  });

  res.json(type);
};

export const deleteProjectType = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.projectType.delete({ where: { id } });
  res.status(204).send();
};

// Budget Ranges Management
export const getBudgetRanges = async (req: Request, res: Response) => {
  const ranges = await prisma.budgetRange.findMany({
    orderBy: { order: 'asc' }
  });
  res.json(ranges);
};

export const addBudgetRange = async (req: Request, res: Response) => {
  const { valueAr, valueEn, minAmount, maxAmount } = req.body;

  const range = await prisma.budgetRange.create({
    data: {
      valueAr,
      valueEn,
      minAmount: parseFloat(minAmount),
      maxAmount: maxAmount ? parseFloat(maxAmount) : null,
      order: await getNextOrder('budgetRange')
    }
  });

  res.status(201).json(range);
};

export const updateBudgetRange = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { valueAr, valueEn, minAmount, maxAmount } = req.body;

  const range = await prisma.budgetRange.update({
    where: { id },
    data: {
      valueAr,
      valueEn,
      minAmount: parseFloat(minAmount),
      maxAmount: maxAmount ? parseFloat(maxAmount) : null
    }
  });

  res.json(range);
};

export const deleteBudgetRange = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.budgetRange.delete({ where: { id } });
  res.status(204).send();
};

// Timeline Options Management
export const getTimelines = async (req: Request, res: Response) => {
  const timelines = await prisma.timeline.findMany({
    orderBy: { order: 'asc' }
  });
  res.json(timelines);
};

export const addTimeline = async (req: Request, res: Response) => {
  const { valueAr, valueEn, months } = req.body;

  const timeline = await prisma.timeline.create({
    data: {
      valueAr,
      valueEn,
      months: parseInt(months),
      order: await getNextOrder('timeline')
    }
  });

  res.status(201).json(timeline);
};

export const updateTimeline = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { valueAr, valueEn, months } = req.body;

  const timeline = await prisma.timeline.update({
    where: { id },
    data: {
      valueAr,
      valueEn,
      months: parseInt(months)
    }
  });

  res.json(timeline);
};

export const deleteTimeline = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.timeline.delete({ where: { id } });
  res.status(204).send();
};

// Project Requests Management
export const getProjectRequests = async (req: Request, res: Response) => {
  const requests = await prisma.projectRequest.findMany({
    orderBy: { createdAt: 'desc' }
  });
  res.json(requests);
};

export const getProjectRequestById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const request = await prisma.projectRequest.findUnique({
    where: { id }
  });

  if (!request) {
    throw new ApiError(404, 'Project request not found');
  }

  res.json(request);
};

export const submitProjectRequest = async (req: Request, res: Response) => {
  const {
    name,
    email,
    phone,
    company,
    projectType,
    budget,
    timeline,
    description
  } = req.body;

  const request = await prisma.projectRequest.create({
    data: {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      description
    }
  });

  // Send notification email
  await sendProjectRequestEmail(request);

  res.status(201).json(request);
};

export const updateProjectRequestStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const request = await prisma.projectRequest.update({
    where: { id },
    data: { status }
  });

  res.json(request);
};

// Helper function to get next order number
async function getNextOrder(model: 'projectType' | 'budgetRange' | 'timeline') {
  const lastItem = await prisma[model].findFirst({
    orderBy: { order: 'desc' }
  });
  return (lastItem?.order ?? -1) + 1;
}