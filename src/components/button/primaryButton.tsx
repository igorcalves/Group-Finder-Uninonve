import React from 'react';
import './styles.css';

interface PrimaryButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ onClick, children }) => {
  return (
    <button className="primary-button" onClick={onClick}>
      <span>{children}</span>
    </button>
  );
};

export default PrimaryButton;
