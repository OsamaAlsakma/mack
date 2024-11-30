import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { ApiError } from '../utils/ApiError';
import { uploadFile } from '../services/storage.service';
import { sendApplicationNotification } from '../services/notification.service';

// Get all jobs
export const getJobs = async (req: Request, res: Response) => {
  const jobs = await prisma.job.findMany({
    where: { active: true },
    orderBy: [
      { featured: 'desc' },
      { createdAt: 'desc' }
    ]
  });
  res.json(jobs);
};

// Get job by ID
export const getJobById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const job = await prisma.job.findUnique({ where: { id } });
  
  if (!job) {
    throw new ApiError(404, 'Job not found');
  }
  
  res.json(job);
};

// Create new job
export const createJob = async (req: Request, res: Response) => {
  const {
    titleAr,
    titleEn,
    departmentAr,
    departmentEn,
    locationAr,
    locationEn,
    type,
    experience,
    descriptionAr,
    descriptionEn,
    requirementsAr,
    requirementsEn,
    benefitsAr,
    benefitsEn,
    skills,
    salary,
    featured
  } = req.body;

  const job = await prisma.job.create({
    data: {
      titleAr,
      titleEn,
      departmentAr,
      departmentEn,
      locationAr,
      locationEn,
      type,
      experience,
      descriptionAr,
      descriptionEn,
      requirementsAr,
      requirementsEn,
      benefitsAr,
      benefitsEn,
      skills,
      salary,
      featured: featured || false
    }
  });

  res.status(201).json(job);
};

// Update job
export const updateJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    titleAr,
    titleEn,
    departmentAr,
    departmentEn,
    locationAr,
    locationEn,
    type,
    experience,
    descriptionAr,
    descriptionEn,
    requirementsAr,
    requirementsEn,
    benefitsAr,
    benefitsEn,
    skills,
    salary,
    featured,
    active
  } = req.body;

  const job = await prisma.job.update({
    where: { id },
    data: {
      titleAr,
      titleEn,
      departmentAr,
      departmentEn,
      locationAr,
      locationEn,
      type,
      experience,
      descriptionAr,
      descriptionEn,
      requirementsAr,
      requirementsEn,
      benefitsAr,
      benefitsEn,
      skills,
      salary,
      featured,
      active
    }
  });

  res.json(job);
};

// Submit job application
export const submitApplication = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const { name, email, phone, coverLetter } = req.body;
  const resumeFile = req.file;

  if (!resumeFile) {
    throw new ApiError(400, 'Resume file is required');
  }

  // Upload resume to storage
  const resumeUrl = await uploadFile(resumeFile);

  // Create application
  const application = await prisma.jobApplication.create({
    data: {
      jobId,
      name,
      email,
      phone,
      resumeUrl,
      coverLetter
    },
    include: {
      job: true
    }
  });

  // Send notification
  await sendApplicationNotification(application);

  res.status(201).json(application);
};

// Get all applications (admin only)
export const getApplications = async (req: Request, res: Response) => {
  const applications = await prisma.jobApplication.findMany({
    include: {
      job: {
        select: {
          titleAr: true,
          titleEn: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
  
  res.json(applications);
};

// Update application status (admin only)
export const updateApplicationStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const application = await prisma.jobApplication.update({
    where: { id },
    data: { status, notes },
    include: {
      job: true
    }
  });

  res.json(application);
};