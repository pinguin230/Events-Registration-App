import React from 'react';
import { Link } from 'react-router-dom';
import MyNavLink from "../nav-bar/MyNavLink";

interface EventCardProps {
    title: string;
    description: string;
    date: string;
    organizer: string;
    id: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, description, date, organizer, id }) => {
    return (
        <div className="event-card">
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{date}</p>
            <p>{organizer}</p>
            <div>
                <MyNavLink to={`/register/${id}`}>Register</MyNavLink>
                <MyNavLink to={`/participants/${id}`}>View</MyNavLink>
            </div>
        </div>
    );
};

export default EventCard;
