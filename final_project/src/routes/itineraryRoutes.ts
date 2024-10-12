import express, { Request, Response, NextFunction } from 'express';
import {
  createItineraryItem,
  getItineraryItems,
  updateItineraryItem,
  deleteItineraryItem,
} from '../controllers/itineraryController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, createItineraryItem);
router.get('/', protect, getItineraryItems);
router.put('/:id', protect, updateItineraryItem);
router.delete('/:id', protect, deleteItineraryItem);

export default router;
