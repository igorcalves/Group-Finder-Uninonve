import React from 'react';
import './styles.css';
import CloseBtn from '@mui/icons-material/Close';

interface TextModalProps {
    text: string;
    handleCloseModal: () => void;
}
const TextModal: React.FC<TextModalProps> = ({ text, handleCloseModal }) => {
    return (
        <div className="background-modal">
            <div className="modal-container-description">
                <div className="title-container">
                    <h1>Descrição do grupo</h1>
                    <CloseBtn
                        className="close-button"
                        onClick={handleCloseModal}
                    />
                </div>
                {text}
            </div>
        </div>
    );
};

export default TextModal;
