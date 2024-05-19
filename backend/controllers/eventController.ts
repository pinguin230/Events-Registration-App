import { Request, Response } from 'express';
import Event from '../models/Event';

export const createEvent = async (req: Request, res: Response): Promise<void> => {
    const { title, description, date, organizer } = req.body;
    const event = new Event({ title, description, date, organizer });
    try {
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getEvents = async (req: Request, res: Response): Promise<void> => {
    const { page = 1, limit = 10, sortBy = 'date' } = req.query;
    try {
        const events = await Event.find()
            .sort({ [sortBy as string]: 1 })
            .skip((+page - 1) * +limit)
            .limit(+limit);
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEventById = async (req: Request, res: Response)=> {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateEvent = async (req: Request, res: Response)=> {
    const { id } = req.params;
    const { title, description, date, organizer } = req.body;
    try {
        const event = await Event.findByIdAndUpdate(id, { title, description, date, organizer }, { new: true });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteEvent = async (req: Request, res: Response)=> {
    const { id } = req.params;
    try {
        const event = await Event.findByIdAndDelete(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
