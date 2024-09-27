import React from 'react';
import './styles.css';

interface PrimaryButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
    widthP?: string;
    colorP?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    onClick,
    children,
    disabled,
    widthP,
    colorP,
}) => {
    return (
        <button
            className={disabled ? 'disabled-button' : 'primary-button '}
            onClick={onClick}
            disabled={disabled}
            style={{
                width: widthP,
                backgroundColor: disabled ? 'gray' : colorP,
            }}
        >
            <span>{children}</span>
        </button>
    );
};

export default PrimaryButton;
