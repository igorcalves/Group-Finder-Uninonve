import React, { useState } from 'react';
import { Group } from '../../domain/group';
import { User } from '../../domain/user';
import './styles.css';
import PrimaryButton from '../button/primaryButton';
import PersonIcon from '@mui/icons-material/Person';
import MemberModal from '../modal/memberModal';
import AddMemberModal from '../modal/addMemberModal';
import ArticleIcon from '@mui/icons-material/Article';
import { Groups, Maximize } from '@mui/icons-material';

import TextModal from '../modal/textModal';
interface CardGroupProps {
    group: Group;
}

export function CardGroup({ group }: CardGroupProps) {
    const [members, setMembers] = useState<User[]>(group.members || []);
    const [showModal, setShowModal] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const sizeMax = 5;
    function addMember() {
        setShowAddMemberModal(true);
    }

    return (
        <div className="card-container">
            <div className="card-header"> 
                {group.name}
                <div className="group-container">
                    <Groups/> 
                    {members.length}/{sizeMax}
                </div>
            </div>
            <div className="card-body">
                <p>{group.discipline}</p>
                <p>{group.date}</p>
                <p>{group.description}</p>
            </div>
            <div className="card-footer">
            <PrimaryButton
                    onClick={addMember}
                    disabled={!(members.length < sizeMax)}
                    widthP='270px'
                >
                    {members.length < sizeMax ? 'Solicitar entrada' : 'Lotado'}
                </PrimaryButton>   
                <PrimaryButton
                    onClick={addMember}
                    disabled={!(members.length < sizeMax)}
                    widthP='270px'
                >
                    {members.length < sizeMax ? 'Solicitar entrada' : 'Lotado'}
                </PrimaryButton>                
            </div>
            {showModal && (
                <MemberModal setShowModal={setShowModal} members={members} />
            )}

            {showAddMemberModal && (
                <AddMemberModal
                    setShowModal={setShowAddMemberModal}
                    members={members}
                    setMembers={setMembers}
                />
            )}
            {showDescription && (
                <TextModal
                    text={group.description}
                    handleCloseModal={() => setShowDescription(false)}
                />
            )}
        </div>
    );
}

export default CardGroup;
