import React, { Dispatch, SetStateAction } from 'react';
import './styles.css';

interface InputProps {
    placeholder: string;
    setContent: Dispatch<SetStateAction<string>>;
    widthP?: string;
    label?: string;
}

const PrimaryInput: React.FC<InputProps> = ({
    placeholder,
    setContent,
    widthP,
    label,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    };

    return (
        <>
            <div className="label-container">
                <p>{label}</p>
                <input
                    style={{ width: widthP }}
                    type="text"
                    placeholder={placeholder}
                    onChange={handleChange}
                />
            </div>
        </>
    );
};

export default PrimaryInput;
