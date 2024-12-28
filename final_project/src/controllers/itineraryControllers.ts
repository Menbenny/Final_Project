import { Request, Response, NextFunction } from 'express';
import ItineraryItem from '../models/itineraryModel'; 
import asyncHandler from 'express-async-handler';

export const createItineraryItem = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, date, location, description } = req.body;

    
    if (!title || !date || !location) {
      res.status(400);
      throw new Error('Please provide title, date, and location for the itinerary item.');
    }

    
    const itineraryItem = await ItineraryItem.create({
      title,
      date,
      location,
      description,
      user: req.user.id, 
    });

    res.status(201).json(itineraryItem);
  }
);


export const getItineraryItems = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const itineraryItems = await ItineraryItem.find({ user: req.user.id }).sort({ date: 1 });

    res.status(200).json(itineraryItems);
  }
);

export const getItineraryItemById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400);
      throw new Error('Invalid itinerary item ID.');
    }

    const itineraryItem = await ItineraryItem.findById(id);

    if (!itineraryItem) {
      res.status(404);
      throw new Error('Itinerary item not found.');
    }

    
    if (itineraryItem.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized to view this itinerary item.');
    }

    res.status(200).json(itineraryItem);
  }
);

export const updateItineraryItem = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, date, location, description } = req.body;

    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400);
      throw new Error('Invalid itinerary item ID.');
    }

    
    const itineraryItem = await ItineraryItem.findById(id);

    if (!itineraryItem) {
      res.status(404);
      throw new Error('Itinerary item not found.');
    }

    
    if (itineraryItem.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized to update this itinerary item.');
    }

    
    if (title) itineraryItem.title = title;
    if (date) itineraryItem.date = date;
    if (location) itineraryItem.location = location;
    if (description !== undefined) itineraryItem.description = description;

    const updatedItineraryItem = await itineraryItem.save();

    res.status(200).json(updatedItineraryItem);
  }
);

export const deleteItineraryItem = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400);
      throw new Error('Invalid itinerary item ID.');
    }

    
    const itineraryItem = await ItineraryItem.findById(id);

    if (!itineraryItem) {
      res.status(404);
      throw new Error('Itinerary item not found.');
    }

    
    if (itineraryItem.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized to delete this itinerary item.');
    }

    await itineraryItem.remove();

    res.status(200).json({ message: 'Itinerary item removed successfully.' });
  }
);
