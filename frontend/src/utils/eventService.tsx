import axios from 'axios';

const API_URL = 'https://events-registration-app-77ki.onrender.com/events';

export const fetchEvents = async (page: number = 1, limit: number = 20, sortBy: string = 'date') => {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}&sortBy=${sortBy}`);
    return response.data;
};

export const fetchEvent = async (eventId: string) => {
    const response = await axios.get(`${API_URL}/${eventId}`);
    return response.data;
};

export const createEvent = async (eventData: { title: string; description: string; date: string; organizer: string }) => {
    const response = await axios.post(API_URL, eventData);
    return response.data;
};

export const deleteEvent = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
};