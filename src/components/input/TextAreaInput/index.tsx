import React from 'react';
import './styles.css';
interface TextFieldInputProps {
    label: string;
    content: string;
    setContent: (content: string) => void;
    disabled?: boolean;
}

const TextAreaInput: React.FC<TextFieldInputProps> = ({
    label,
    content,
    setContent,
    disabled,
}) => {
    return (
        <div className="label-container">
            <p>{label}</p>
            <textarea
                className="custom-text-area-input"
                onChange={(event) => setContent(event.target.value)}
                value={content}
                disabled={disabled}
            />
        </div>
    );
};

export default TextAreaInput;
