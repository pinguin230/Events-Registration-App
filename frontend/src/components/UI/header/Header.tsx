import React, { useState } from 'react';
import logoImage from './../../../photos/ET-school Events Registration App (test task).jpg';
import MyNavLink from '../nav-bar/MyNavLink';
import './Header.scss';
import MyModal from './../../../components/UI/my-modal/MyModal';
import EventForm from "./../../../components/UI/event-form/EventForm";
import {createEvent} from "./../../../utils/eventService";

const Header: React.FC = () => {
    const [visible, setVisible] = useState(false);

    const handleCreateEvent = async (eventData: { title: string; description: string; date: string; organizer: string }) => {
        try {
            const newEvent = await createEvent(eventData);
            console.log('Event created successfully:', newEvent);
            setVisible(false);
        } catch (error) {
            console.error('Failed to create event:', error);
        }
    };

    return (
        <>
            <div className="header-container">
                <MyNavLink to="/"> <img style={{ height: "30px" }} src={logoImage} alt="logo" /> </MyNavLink>
                <button onClick={() => setVisible(true)}>Create a new event</button>
            </div>
            <MyModal
                visible={visible}
                setVisible={setVisible}
            >
                <EventForm onSubmit={handleCreateEvent} />
            </MyModal>
        </>
    );
};

export default Header;
