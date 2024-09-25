import React, { Dispatch, SetStateAction, useState } from 'react';
import './styles.css';
import PrimaryInput from '../../input';
import PrimaryButton from '../../button/primaryButton';
import CloseBtn from '@mui/icons-material/Close';
interface CreateGroupModalProps {
    isVisible: boolean;
    setName: Dispatch<SetStateAction<string>>;
    name: string;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
    handleButton: () => void;
    handleCloseModal: () => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
    isVisible,
    setName,
    setDescription,
    handleButton,
    name,
    description,
    handleCloseModal,
}) => {
    if (!isVisible) return null;
    return (
        <div className="background-container">
            <div className="modal-container">
                <h1>Criar grupo</h1>
                <PrimaryInput
                    placeholder="Nome do grupo"
                    setContent={setName}
                />
                <PrimaryInput
                    placeholder="Descrição do grupo"
                    setContent={setDescription}
                />

                <PrimaryButton
                    onClick={handleButton}
                    disabled={name === '' || description === ''}
                >
                    Criar
                </PrimaryButton>
                <CloseBtn className="close-button" onClick={handleCloseModal} />
            </div>
        </div>
    );
};

export default CreateGroupModal;
