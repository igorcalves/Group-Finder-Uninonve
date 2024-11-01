import React from 'react';
import PrimaryButton from '../../button/primaryButton';
import './styles.css';
interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onClose,
    onDelete,
}) => {
    return (
        <div className="background-modal">
            <div className="modal-container">
                <div className="modal-header">
                    <h1>Deletar grupo</h1>
                </div>
                <div className="modal-body">
                    <p>Tem certeza que deseja deletar o grupo?</p>
                    <div className="button-container">
                        <PrimaryButton
                            onClick={onDelete}
                            colorP="red"
                            colorText="white"
                        >
                            Sim
                        </PrimaryButton>
                        <PrimaryButton
                            onClick={onClose}
                            colorP="#006d9b"
                            colorText="white"
                        >
                            Não
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
