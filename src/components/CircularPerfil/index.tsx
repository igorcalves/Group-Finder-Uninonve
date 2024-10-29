import React from 'react';
import { getFirstLetterOfNameAndSurname } from '../../utils/stringTransfomation';
import './styles.css';
interface CircularPerfilProps {
    name: string;
}

const CircularPerfil: React.FC<CircularPerfilProps> = ({ name }) => {
    return (
        <div className="form-user-circle">
            <p>{getFirstLetterOfNameAndSurname(name)}</p>
        </div>
    );
};

export default CircularPerfil;
