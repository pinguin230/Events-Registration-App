import axios from 'axios';
import Event from '../models/Event';

export const fetchExternalEvents = async (): Promise<void> => {
    try {
        const response = await axios.get('URL_OF_EXTERNAL_API');
        const events = response.data;
        events.forEach(async (event: any) => {
            const newEvent = new Event({
                title: event.title,
                description: event.description,
                date: event.date,
                organizer: event.organizer,
            });
            await newEvent.save();
        });
    } catch (error) {
        console.error('Error fetching external events:', error);
    }
};
