import axios from 'axios';

const API_URL = 'https://events-registration-app-backend-11ao.onrender.com/registrations';

export const registerUser = async (registration: any) => {
    console.log(registration)
    const response = await axios.post(API_URL, registration);
    return response.data;
};

export const fetchRegistrationsByEvent = async (eventId: string) => {
    const response = await axios.get(`${API_URL}/event/${eventId}`);
    return response.data;
};