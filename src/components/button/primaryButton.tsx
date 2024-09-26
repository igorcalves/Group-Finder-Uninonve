import React from 'react';
import './styles.css';

interface PrimaryButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
    widthP?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    onClick,
    children,
    disabled,
    widthP,
}) => {
    return (
        <button
            className={disabled ? 'disabled-button' : 'primary-button '}
            onClick={onClick}
            disabled={disabled}
            style={{ width: widthP }}
        >
            <span>{children}</span>
        </button>
    );
};

export default PrimaryButton;
