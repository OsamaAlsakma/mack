import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { ApiError } from '../utils/ApiError';

export const createService = async (req: Request, res: Response) => {
  const { title, titleAr, description, descriptionAr, icon, features } = req.body;

  const service = await prisma.service.create({
    data: {
      title,
      titleAr,
      description,
      descriptionAr,
      icon,
      features: {
        create: features.map((f: any) => ({
          name: f.name,
          nameAr: f.nameAr,
        })),
      },
    },
    include: {
      features: true,
    },
  });

  res.status(201).json(service);
};

export const getServices = async (req: Request, res: Response) => {
  const services = await prisma.service.findMany({
    include: {
      features: true,
    },
  });

  res.json(services);
};

export const getServiceById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      features: true,
    },
  });

  if (!service) {
    throw new ApiError(404, 'Service not found');
  }

  res.json(service);
};

export const updateService = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, titleAr, description, descriptionAr, icon } = req.body;

  const service = await prisma.service.update({
    where: { id },
    data: {
      title,
      titleAr,
      description,
      descriptionAr,
      icon,
    },
    include: {
      features: true,
    },
  });

  res.json(service);
};