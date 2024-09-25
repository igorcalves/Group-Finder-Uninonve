import React from 'react';
import { User } from '../../domain/user';
import './styles.css';
interface CardUserProps {
    user: User;
}

const CardUser: React.FC<CardUserProps> = ({ user }) => {
    return (
        <div className="card-user">
            <div className="first-container">
                <p className="card-name">{user.name}</p>
                <p className="card-phone">{user.phone}</p>
            </div>
            <p className="card-email">{user.email}</p>
        </div>
    );
};

export default CardUser;
