import axios from 'axios';

const API_URL = 'http://localhost:5000/events';

export const fetchEvents = async (page: number = 1, limit: number = 20, sortBy: string = 'date') => {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}&sortBy=${sortBy}`);
    return response.data;
};

export const fetchEvent = async (eventId: string) => {
    const response = await axios.get(`${API_URL}/${eventId}`);
    return response.data;
};
