import React, { Dispatch, SetStateAction } from 'react';
import './styles.css';

interface InputProps {
    placeholder: string;
    setContent: Dispatch<SetStateAction<string>>;
    widthP?: string;
}

const PrimaryInput: React.FC<InputProps> = ({
    placeholder,
    setContent,
    widthP,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    };

    return (
        <input
            style={{ width: widthP }}
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
};

export default PrimaryInput;
