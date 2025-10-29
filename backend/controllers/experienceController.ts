import { Request, Response } from 'express';

import Experience from '../models/Experience';

export const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find()
      .select('title description location image rating reviewCount slots')
      .lean();

    //min price for each experience
    const experiencesWithPrice = experiences.map((exp) => {
      const minPrice = Math.min(...exp.slots.map((slot: any) => slot.price));
      return {
        ...exp,
        startingPrice: minPrice
      };
    });
    res.json({ experiencesWithPrice });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ message: 'Error fetching experiences', error });
  }
};

//get experience by id
export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    // Filter out past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const availableSlots = experience.slots.filter((slot) => {
      const slotDate = new Date(slot.date);
      slotDate.setHours(0, 0, 0, 0);
      return slotDate >= today;
    });

    // Convert to plain object and update slots
    const experienceData = {
      ...experience.toObject(),
      slots: availableSlots
    };

    res.json(experienceData);
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ message: 'Error fetching experience', error });
  }
};
