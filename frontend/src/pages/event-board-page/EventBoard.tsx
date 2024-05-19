import React, { useState, useEffect, useCallback } from 'react';
import EventCard from "../../components/UI/event-card/EventCard";
import { fetchEvents } from "../../utils/eventService";
import "./EventBoard.scss";

const EventsBoard: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState<string>('date');

    const loadEvents = useCallback(async () => {
        setLoading(true);
        const data = await fetchEvents(page, 20, sortBy);
        setEvents(prevEvents => [...prevEvents, ...data]);
        setLoading(false);
    }, [page, sortBy]);

    useEffect(() => {
        loadEvents();
    }, [loadEvents]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll, loading]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
        setEvents([]);
        setPage(1);
    };

    return (
        <div className="events-board">
            <h1>Events</h1>
            <div className="sort-options">
                <label htmlFor="sort">Sort by: </label>
                <select id="sort" value={sortBy} onChange={handleSortChange}>
                    <option value="title">Title</option>
                    <option value="date">Event Date</option>
                    <option value="organizer">Organizer</option>
                </select>
            </div>
            <div className="events-list">
                {events.map(event => (
                    <EventCard
                        key={event._id}
                        id={event._id}
                        title={event.title}
                        description={event.description}
                        date={event.date}
                        organizer={event.organizer}
                    />
                ))}
            </div>
            {loading && <div>Loading...</div>}
        </div>
    );
};

export default EventsBoard;
