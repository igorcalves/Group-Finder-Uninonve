import React from 'react';
import './styles.css';

interface PrimaryButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
    widthP?: string;
    colorP?: string;
    colorText?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    onClick,
    children,
    disabled,
    widthP,
    colorP,
    colorText,
}) => {
    return (
        <button
            className={disabled ? 'disabled-button' : 'primary-button '}
            onClick={onClick}
            disabled={disabled}
            style={{
                width: widthP,
                backgroundColor: disabled ? 'gray' : colorP,
                color: colorText,
            }}
        >
            <span>{children}</span>
        </button>
    );
};

export default PrimaryButton;
