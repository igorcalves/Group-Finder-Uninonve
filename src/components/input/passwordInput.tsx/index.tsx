import React, { useState } from 'react';
import './styles.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface InputProps {
    placeholder: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    widthP?: string;
    label?: string;
}

const PasswordInput: React.FC<InputProps> = ({
    placeholder,
    setContent,
    label,
    widthP,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="label-password-container">
            {label && <p>{label}</p>}
            <div className="input-container" style={{ width: widthP }}>
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    onChange={handleChange}
                    className="password-input"
                />
                <button
                    type="button"
                    className="show-password-btn"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? (
                        <VisibilityOff style={{ fontSize: 20 }} />
                    ) : (
                        <Visibility style={{ fontSize: 20 }} />
                    )}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
