import React from 'react';
import './custom-button.style.css';

const Button = ({ children, inverted, ...props }) => (
    <button className={`btn custom-button ${inverted ? 'inverted' : null}`} {...props}>
        {children}
    </button>
);

export default Button;