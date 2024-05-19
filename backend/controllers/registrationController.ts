import { Request, Response } from 'express';
import Registration from '../models/Registration';

export const createRegistration = async (req: Request, res: Response): Promise<void> => {
    const { name, email, birthDate, source, eventId } = req.body;
    const registration = new Registration({ name, email, birthDate, source, eventId });
    try {
        await registration.save();
        res.status(201).json(registration);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getRegistrations = async (req: Request, res: Response): Promise<void> => {
    try {
        const registrations = await Registration.find().populate('eventId');
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRegistrationsByEvent = async (req: Request, res: Response): Promise<void> => {
    const { eventId } = req.params;
    try {
        const registrations = await Registration.find({ eventId }).populate('eventId');
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRegistration = async (req: Request, res: Response)=> {
    const { id } = req.params;
    const { name, email, birthDate, source, eventId } = req.body;
    try {
        const registration = await Registration.findByIdAndUpdate(id, { name, email, birthDate, source, eventId }, { new: true });
        if (!registration) return res.status(404).json({ message: 'Registration not found' });
        res.json(registration);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteRegistration = async (req: Request, res: Response)=> {
    const { id } = req.params;
    try {
        const registration = await Registration.findByIdAndDelete(id);
        if (!registration) return res.status(404).json({ message: 'Registration not found' });
        res.json({ message: 'Registration deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
