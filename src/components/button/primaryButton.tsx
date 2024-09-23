import React from 'react';
import './styles.css';

interface PrimaryButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  children,
  disabled,
}) => {
  return (
    <button
      className={disabled ? 'disabled-button' : 'primary-button '}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
};

export default PrimaryButton;
