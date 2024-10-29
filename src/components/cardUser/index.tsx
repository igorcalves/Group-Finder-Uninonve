import React from 'react';
import { User } from '../../domain/user';
import './styles.css';

interface CardUserProps {
    user: User;
    openModal?: () => void;
}

const CardUser: React.FC<CardUserProps> = ({ user, openModal }) => {
    return (
        <div className="card-user">
            <div className="first-container">
                <div className="info-container">
                    <p className="card-name">{user.name}</p>
                    <p className="card-phone">{user.phone}</p>
                    <p className="card-email">{user.email}</p>
                </div>
                <div className="card-profile" onClick={openModal}>
                    <p>Ver perfil</p>
                </div>
            </div>
        </div>
    );
};

export default CardUser;
