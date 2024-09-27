import React, { Dispatch, SetStateAction } from 'react';
import './styles.css';
import { User } from '../../../domain/user';
import PrimaryButton from '../../button/primaryButton';
import CardUser from '../../cardUser';
import CloseBtn from '@mui/icons-material/Close';
interface MemberModalProps {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    members: User[];
}

const MemberModal: React.FC<MemberModalProps> = ({ setShowModal, members }) => {
    return (
        <div className="background-modal">
            <div className="member-modal-contaner">
                <div className="modal-header">
                    <h1>Integrantes</h1>
                    <CloseBtn
                        className="close-icon"
                        onClick={() => setShowModal(false)}
                    />
                </div>
                <div className="modal-body">
                    {members.map((member) => (
                        <CardUser key={member.email} user={member} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MemberModal;
