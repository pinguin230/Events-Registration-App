import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Registration.scss';
import { registerUser } from '../../utils/registrationService';
import ValidatedInput from '../../components/UI/validated-input/ValidatedInput';
import { validateAge, validateEmail, validateName } from '../../utils/validation';

const Registration: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate  = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        birthDate: '',
        source: ''
    });

    const [isProblem, setIsProblem] = useState({
        name: true,
        email: true,
        birthDate: true,
    });

    const allFieldsValid = () => {
        return Object.values(isProblem).every(value => value === false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, source: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (allFieldsValid()) {
            try {
                console.log(eventId)
                await registerUser({ ...formData, eventId });
                navigate(`/participants/${eventId}`);
            } catch (error) {
                console.error('Registration failed:', error);
            }
        } else {
            alert("Please enter all fields correctly");
        }
    };

    useEffect(() => {
        console.log(isProblem)
    }, [formData.name]);

    return (
        <div className="register-container">
            <h1>Event registration</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Full name
                    <ValidatedInput
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        validationFunction={validateName}
                        setIsProblem={setIsProblem}
                    />
                </label>
                <label>
                    Email
                    <ValidatedInput
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        validationFunction={validateEmail}
                        setIsProblem={setIsProblem}
                    />
                </label>
                <label>
                    Date of birth
                    <ValidatedInput
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        validationFunction={validateAge}
                        setIsProblem={setIsProblem}
                    />
                </label>
                <div>
                    <p>Where did you hear about this event?</p>
                    <label>
                        <input
                            type="radio"
                            name="source"
                            value="Social media"
                            checked={formData.source === 'Social media'}
                            onChange={handleRadioChange}
                            required
                        />
                        Social media
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="source"
                            value="Friends"
                            checked={formData.source === 'Friends'}
                            onChange={handleRadioChange}
                            required
                        />
                        Friends
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="source"
                            value="Found myself"
                            checked={formData.source === 'Found myself'}
                            onChange={handleRadioChange}
                            required
                        />
                        Found myself
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Registration;
