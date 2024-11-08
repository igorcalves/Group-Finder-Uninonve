import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import './styles.css';
import {
    maskToQuantityNumber,
    maskToPhoneNumber,
    onlyText,
} from '../../utils/inputValidator';

interface InputProps {
    placeholder?: string;
    setContent: Dispatch<SetStateAction<string>>;
    widthP?: string;
    heightP?: string;
    label?: string;
    hasError?: boolean;
    onBlur?: () => void;
    type?: string;
    maxLength?: number;
    content?: string;
    disabled?: boolean;
}

const PrimaryInput: React.FC<InputProps> = ({
    placeholder,
    setContent,
    widthP,
    label,
    hasError,
    onBlur,
    type,
    maxLength,
    content,
    heightP,
    disabled,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value.replace(/\D/g, '');

        if (type === 'phone') {
            if (inputValue.length > 11) {
                inputValue = inputValue.slice(0, 11);
            }
            event.target.value = maskToPhoneNumber(inputValue);
            setContent(event.target.value);
        } else if (type === 'number') {
            maskToQuantityNumber(event);
            setContent(event.target.value);
        } else if (type === 'text') {
            onlyText(event);
            setContent(event.target.value);
        } else {
            setContent(event.target.value);
        }
    };

    return (
        <>
            <div className="label-container" style={{ width: widthP }}>
                <p>{label}</p>
                <input
                    className={classNames('custom-input', { error: hasError })}
                    type={type || 'text'}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onBlur={onBlur}
                    value={content}
                    maxLength={maxLength}
                    disabled={disabled}
                    style={{ height: heightP }}
                />

                <p
                    className={classNames('error-message', {
                        visible: hasError,
                    })}
                    style={{
                        color: hasError ? 'red' : 'transparent',
                    }}
                >
                    {hasError ? 'Campo inválido *' : ''}
                </p>
            </div>
        </>
    );
};

export default PrimaryInput;
