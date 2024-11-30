import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { uploadImage } from '../services/storage.service';
import { ApiError } from '../utils/ApiError';
import { sendProjectNotification } from '../services/notification.service';

export const createProject = async (req: Request, res: Response) => {
  const {
    title,
    titleAr,
    description,
    descriptionAr,
    type,
    budget,
    timeline,
    features,
    technologies,
  } = req.body;

  const project = await prisma.project.create({
    data: {
      title,
      titleAr,
      description,
      descriptionAr,
      type,
      budget: parseFloat(budget),
      timeline,
      clientId: req.user.id,
      features: {
        create: features.map((f: any) => ({
          name: f.name,
          nameAr: f.nameAr,
        })),
      },
      technologies: {
        connect: technologies.map((t: string) => ({ name: t })),
      },
    },
    include: {
      features: true,
      technologies: true,
    },
  });

  await sendProjectNotification(project);

  res.status(201).json(project);
};

export const getProjects = async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    include: {
      features: true,
      technologies: true,
      images: true,
    },
  });

  res.json(projects);
};

export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      features: true,
      technologies: true,
      images: true,
    },
  });

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  res.json(project);
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title,
    titleAr,
    description,
    descriptionAr,
    status,
    budget,
    timeline,
  } = req.body;

  const project = await prisma.project.update({
    where: { id },
    data: {
      title,
      titleAr,
      description,
      descriptionAr,
      status,
      budget: budget ? parseFloat(budget) : undefined,
      timeline,
    },
    include: {
      features: true,
      technologies: true,
    },
  });

  res.json(project);
};

export const uploadProjectImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const file = req.file;

  if (!file) {
    throw new ApiError(400, 'No image file provided');
  }

  const imageUrl = await uploadImage(file);

  const image = await prisma.projectImage.create({
    data: {
      url: imageUrl,
      projectId: id,
    },
  });

  res.status(201).json(image);
};