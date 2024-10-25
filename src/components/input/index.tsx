import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import './styles.css';
import { maskToQuantityNumber } from '../../utils/inputValidator';

interface InputProps {
    placeholder: string;
    setContent: Dispatch<SetStateAction<string>>;
    widthP?: string;
    label?: string;
    hasError?: boolean;
    onBlur?: () => void;
    type?: string;
    maxLength?: number;
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
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'number') {
            maskToQuantityNumber(event);
        }
        setContent(event.target.value);
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
                    maxLength={maxLength}
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
