import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRegistrationsByEvent } from '../../utils/registrationService';
import './ParticipantsStyle.scss';
import { fetchEvent } from '../../utils/eventService';
import RegistrationChart from '../../components/UI/registration-chart/RegistrationChart';
import { format, parseISO } from 'date-fns';

const Participants: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const [participants, setParticipants] = useState<any[]>([]);
    const [eventName, setEventName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [registrationsPerDay, setRegistrationsPerDay] = useState<{ date: string, count: number }[]>([]);

    useEffect(() => {
        const loadParticipants = async () => {
            const data = await fetchRegistrationsByEvent(eventId);
            setParticipants(data);
            if (data.length > 0) {
                setEventName(data[0].eventId.title);
                const registrationsCount = countRegistrationsPerDay(data);
                setRegistrationsPerDay(registrationsCount);
            } else {
                const eventResponse = await fetchEvent(eventId);
                setEventName(eventResponse.title);
            }
        };
        loadParticipants();
    }, [eventId]);

    const countRegistrationsPerDay = (registrations: any[]) => {
        const countByDate: { [key: string]: number } = {};
        registrations.forEach(reg => {
            const date = format(parseISO(reg.createdAt), 'yyyy-MM-dd');
            if (!countByDate[date]) {
                countByDate[date] = 0;
            }
            countByDate[date]++;
        });
        return Object.entries(countByDate).map(([date, count]) => ({ date, count }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredParticipants = participants.filter(participant =>
        participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="participants-container">
            <h1>{`"${eventName}" participants`}</h1>
            {participants.length > 0 ? (
                <>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <RegistrationChart registrationsPerDay={registrationsPerDay} />
                    <div className="participants-list">
                        {filteredParticipants.map(participant => (
                            <div className="participant-card" key={participant._id}>
                                <h2>{participant.name}</h2>
                                <p>{participant.email}</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="no-participants">
                    <p>No participants have registered for this event yet.</p>
                    <Link to={`/register/${eventId}`} className="register-button">Register for this event</Link>
                </div>
            )}
        </div>
    );
};

export default Participants;
