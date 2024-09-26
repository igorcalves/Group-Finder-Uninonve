import React, { useState } from 'react';
import './styles.css';
import { MenuBook, Logout } from '@mui/icons-material';
import { DISCIPLINES } from '../../constants/disciplines';
import DropDownMenu from '../dropdownMenu/DropDownMenu';
import CreateGroup from '../createGroup';
import { useGlobalContext } from '../../context';

const Header: React.FC = () => {
    const [headerTitle, setHeaderTitle] = useState('');
    const { setCurrentPage } = useGlobalContext();
    return (
        <div className="header">
            <div className="header-section left">
                <div className="icon-test"></div>
            </div>
            <div className="header-section center">
                <h1>{headerTitle}</h1>
            </div>
            <div className="header-section right">
                <CreateGroup />
                <DropDownMenu
                    setHeaderTitle={setHeaderTitle}
                    content={DISCIPLINES}
                    IconComponent={MenuBook}
                />
                <Logout
                    onClick={() => setCurrentPage('login')}
                    className="icon-logout"
                />
            </div>
        </div>
    );
};

export default Header;
