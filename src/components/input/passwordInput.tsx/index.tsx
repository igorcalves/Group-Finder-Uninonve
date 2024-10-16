import React, { useState } from 'react';
import './styles.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import classNames from 'classnames';

interface PasswordInputProps {
    placeholder: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    widthP?: string;
    label?: string;
    hasError?: boolean;
    errorMessage?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    placeholder,
    setContent,
    widthP,
    label,
    hasError,
    errorMessage = '',
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
                    className={`password-input ${hasError ? 'error' : ''}`}
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
            <p
                className={classNames('error-message', { visible: hasError })}
                style={{
                    color: hasError ? 'red' : 'transparent',
                    display: hasError ? 'block' : 'none',
                }}
            >
                {errorMessage !== ''
                    ? errorMessage
                    : 'Campo inválido: a senha deverá ter pelo menos 6 caracteres'}
            </p>
        </div>
    );
};

export default PasswordInput;
