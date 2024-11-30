import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { ApiError } from '../utils/ApiError';
import { uploadImage, deleteImage } from '../services/storage.service';

// Executive Management
export const getExecutives = async (req: Request, res: Response) => {
  const executives = await prisma.executiveQuote.findMany({
    orderBy: { order: 'asc' },
  });
  res.json(executives);
};

export const addExecutive = async (req: Request, res: Response) => {
  const { nameAr, nameEn, titleAr, titleEn, quoteAr, quoteEn } = req.body;
  const imageFile = req.file;

  if (!imageFile) {
    throw new ApiError(400, 'Executive image is required');
  }

  const imageUrl = await uploadImage(imageFile);

  const executive = await prisma.executiveQuote.create({
    data: {
      nameAr,
      nameEn,
      titleAr,
      titleEn,
      quoteAr,
      quoteEn,
      imageUrl,
      order: await getNextOrder('executiveQuote'),
    },
  });

  res.status(201).json(executive);
};

export const updateExecutive = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nameAr, nameEn, titleAr, titleEn, quoteAr, quoteEn } = req.body;
  const imageFile = req.file;

  const executive = await prisma.executiveQuote.findUnique({ where: { id } });
  if (!executive) {
    throw new ApiError(404, 'Executive not found');
  }

  let imageUrl = executive.imageUrl;
  if (imageFile) {
    await deleteImage(executive.imageUrl);
    imageUrl = await uploadImage(imageFile);
  }

  const updated = await prisma.executiveQuote.update({
    where: { id },
    data: {
      nameAr,
      nameEn,
      titleAr,
      titleEn,
      quoteAr,
      quoteEn,
      imageUrl,
    },
  });

  res.json(updated);
};

export const deleteExecutive = async (req: Request, res: Response) => {
  const { id } = req.params;

  const executive = await prisma.executiveQuote.findUnique({ where: { id } });
  if (!executive) {
    throw new ApiError(404, 'Executive not found');
  }

  await deleteImage(executive.imageUrl);
  await prisma.executiveQuote.delete({ where: { id } });

  res.status(204).send();
};

// Project Management
export const addProject = async (req: Request, res: Response) => {
  const {
    titleAr,
    titleEn,
    descriptionAr,
    descriptionEn,
    category,
    technologies,
    featuresAr,
    featuresEn,
    featured,
  } = req.body;
  const imageFile = req.file;

  if (!imageFile) {
    throw new ApiError(400, 'Project image is required');
  }

  const imageUrl = await uploadImage(imageFile);

  const project = await prisma.project.create({
    data: {
      titleAr,
      titleEn,
      descriptionAr,
      descriptionEn,
      imageUrl,
      category,
      technologies,
      featuresAr,
      featuresEn,
      featured: featured || false,
      order: await getNextOrder('project'),
    },
  });

  res.status(201).json(project);
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    titleAr,
    titleEn,
    descriptionAr,
    descriptionEn,
    category,
    technologies,
    featuresAr,
    featuresEn,
    featured,
  } = req.body;
  const imageFile = req.file;

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  let imageUrl = project.imageUrl;
  if (imageFile) {
    await deleteImage(project.imageUrl);
    imageUrl = await uploadImage(imageFile);
  }

  const updated = await prisma.project.update({
    where: { id },
    data: {
      titleAr,
      titleEn,
      descriptionAr,
      descriptionEn,
      imageUrl,
      category,
      technologies,
      featuresAr,
      featuresEn,
      featured,
    },
  });

  res.json(updated);
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  await deleteImage(project.imageUrl);
  await prisma.project.delete({ where: { id } });

  res.status(204).send();
};

// Service Management
export const addService = async (req: Request, res: Response) => {
  const {
    titleAr,
    titleEn,
    descriptionAr,
    descriptionEn,
    icon,
    featuresAr,
    featuresEn,
  } = req.body;

  const service = await prisma.service.create({
    data: {
      titleAr,
      titleEn,
      descriptionAr,
      descriptionEn,
      icon,
      featuresAr,
      featuresEn,
      order: await getNextOrder('service'),
    },
  });

  res.status(201).json(service);
};

export const updateService = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    titleAr,
    titleEn,
    descriptionAr,
    descriptionEn,
    icon,
    featuresAr,
    featuresEn,
  } = req.body;

  const updated = await prisma.service.update({
    where: { id },
    data: {
      titleAr,
      titleEn,
      descriptionAr,
      descriptionEn,
      icon,
      featuresAr,
      featuresEn,
    },
  });

  res.json(updated);
};

export const deleteService = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.service.delete({ where: { id } });
  res.status(204).send();
};

// Helper function to get next order number
async function getNextOrder(model: 'executiveQuote' | 'project' | 'service') {
  const lastItem = await prisma[model].findFirst({
    orderBy: { order: 'desc' },
  });
  return (lastItem?.order ?? -1) + 1;
}