import React, { Dispatch, SetStateAction } from 'react';
import './styles.css';

interface InputProps {
  placeholder: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const PrimaryInput: React.FC<InputProps> = ({ placeholder, setContent }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  return (
    <input type="text" placeholder={placeholder} onChange={handleChange} />
  );
};

export default PrimaryInput;
