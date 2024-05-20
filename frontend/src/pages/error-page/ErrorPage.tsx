import React from 'react';
import './ErrorPage.scss';

const ErrorPage = () => {
    return (
        <div className="error-page">
            <div className="error-container">
                <h1>404</h1>
                <h2>Oops! Page not found</h2>
                <p>We can't find the page you're looking for.</p>
                <a href="/" className="home-link">Go Back Home</a>
            </div>
        </div>
    );
};

export default ErrorPage;
