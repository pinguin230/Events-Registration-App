import React, { useState } from 'react';
import './EventForm.scss';

interface EventFormProps {
    onSubmit: (eventData: { title: string; description: string; date: string; organizer: string }) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [organizer, setOrganizer] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, description, date, organizer });
    };

    return (
        <form className="event-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Event Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="organizer">Organizer</label>
                <input
                    type="text"
                    id="organizer"
                    value={organizer}
                    onChange={(e) => setOrganizer(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create Event</button>
        </form>
    );
};

export default EventForm;
