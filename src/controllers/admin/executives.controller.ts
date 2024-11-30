import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { ApiError } from '../../utils/ApiError';
import { uploadImage, deleteImage } from '../../services/storage.service';

// Get all executives
export const getExecutives = async (req: Request, res: Response) => {
  const executives = await prisma.executiveQuote.findMany({
    orderBy: { order: 'asc' },
  });
  res.json(executives);
};

// Add new executive
export const addExecutive = async (req: Request, res: Response) => {
  const { nameAr, nameEn, titleAr, titleEn, quoteAr, quoteEn } = req.body;
  const imageFile = req.file;

  if (!imageFile) {
    throw new ApiError(400, 'Executive image is required');
  }

  try {
    // Upload image to S3
    const imageUrl = await uploadImage(imageFile);

    // Get the highest order number
    const lastExecutive = await prisma.executiveQuote.findFirst({
      orderBy: { order: 'desc' },
    });
    const newOrder = (lastExecutive?.order ?? -1) + 1;

    // Create new executive
    const executive = await prisma.executiveQuote.create({
      data: {
        nameAr,
        nameEn,
        titleAr,
        titleEn,
        quoteAr,
        quoteEn,
        imageUrl,
        order: newOrder,
      },
    });

    res.status(201).json(executive);
  } catch (error) {
    throw new ApiError(500, 'Error creating executive');
  }
};

// Update executive
export const updateExecutive = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nameAr, nameEn, titleAr, titleEn, quoteAr, quoteEn } = req.body;
  const imageFile = req.file;

  try {
    const executive = await prisma.executiveQuote.findUnique({ where: { id } });
    if (!executive) {
      throw new ApiError(404, 'Executive not found');
    }

    let imageUrl = executive.imageUrl;
    if (imageFile) {
      // Delete old image from S3
      await deleteImage(executive.imageUrl);
      // Upload new image
      imageUrl = await uploadImage(imageFile);
    }

    // Update executive
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
  } catch (error) {
    throw new ApiError(500, 'Error updating executive');
  }
};

// Delete executive
export const deleteExecutive = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const executive = await prisma.executiveQuote.findUnique({ where: { id } });
    if (!executive) {
      throw new ApiError(404, 'Executive not found');
    }

    // Delete image from S3
    await deleteImage(executive.imageUrl);

    // Delete executive from database
    await prisma.executiveQuote.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    throw new ApiError(500, 'Error deleting executive');
  }
};

// Update executive order
export const updateExecutiveOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { newOrder } = req.body;

  try {
    const executive = await prisma.executiveQuote.findUnique({ where: { id } });
    if (!executive) {
      throw new ApiError(404, 'Executive not found');
    }

    // Get all executives
    const executives = await prisma.executiveQuote.findMany({
      orderBy: { order: 'asc' },
    });

    // Reorder executives
    const updates = executives.map((exec) => {
      let newOrderValue = exec.order;
      
      if (exec.id === id) {
        newOrderValue = newOrder;
      } else if (
        (exec.order >= newOrder && exec.order < executive.order) ||
        (exec.order <= newOrder && exec.order > executive.order)
      ) {
        newOrderValue = exec.order + (executive.order > newOrder ? 1 : -1);
      }

      return prisma.executiveQuote.update({
        where: { id: exec.id },
        data: { order: newOrderValue },
      });
    });

    // Execute all updates in a transaction
    await prisma.$transaction(updates);

    res.json({ success: true });
  } catch (error) {
    throw new ApiError(500, 'Error updating executive order');
  }
};

// Get executive by ID
export const getExecutiveById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const executive = await prisma.executiveQuote.findUnique({ where: { id } });
  if (!executive) {
    throw new ApiError(404, 'Executive not found');
  }

  res.json(executive);
};