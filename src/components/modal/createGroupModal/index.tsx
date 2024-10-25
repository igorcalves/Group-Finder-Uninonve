import React, { Dispatch, SetStateAction, useState } from 'react';
import './styles.css';
import PrimaryInput from '../../input';
import PrimaryButton from '../../button/primaryButton';
import CloseBtn from '@mui/icons-material/Close';
import { Checkbox } from '@mui/material';
interface CreateGroupModalProps {
    isVisible: boolean;
    setName: Dispatch<SetStateAction<string>>;
    name: string;
    description: string;
    quantityMembers: string;
    setDescription: Dispatch<SetStateAction<string>>;
    handleButton: () => void;
    handleCloseModal: () => void;
    setQuantityMembers: Dispatch<SetStateAction<string>>;
    closedGroup: boolean;
    setClosedGroup: Dispatch<SetStateAction<boolean>>;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
    isVisible,
    setName,
    setDescription,
    handleButton,
    name,
    description,
    handleCloseModal,
    setQuantityMembers,
    quantityMembers,
    closedGroup,
    setClosedGroup,
}) => {
    const handleCheckboxChange = () => {
        setClosedGroup(!closedGroup);
    };

    if (!isVisible) return null;

    return (
        <div className="background-container">
            <div className="modal-container">
                <div className="modal-header">
                    <h1>Criar grupo</h1>
                    <CloseBtn
                        className="close-icon"
                        onClick={handleCloseModal}
                    />
                </div>
                <div className="modal-body">
                    <PrimaryInput
                        placeholder="Nome do grupo"
                        setContent={setName}
                    />
                    <PrimaryInput
                        placeholder="Descrição do grupo"
                        setContent={setDescription}
                    />
                    <PrimaryInput
                        placeholder="Quantidade de membros"
                        setContent={setQuantityMembers}
                        type="number"
                        maxLength={3}
                    />

                    <div className="checkbox-container">
                        <div className="checkbox-item">
                            <Checkbox
                                checked={closedGroup}
                                onChange={handleCheckboxChange}
                            />
                            <p>Entrada Somente com convite</p>
                        </div>
                    </div>

                    <PrimaryButton
                        onClick={handleButton}
                        disabled={
                            name === '' ||
                            description === '' ||
                            quantityMembers === ''
                        }
                        widthP="290px"
                        colorP="#006d9b"
                    >
                        Criar Grupo
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default CreateGroupModal;
