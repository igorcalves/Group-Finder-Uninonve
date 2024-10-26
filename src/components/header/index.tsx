import React, { useState } from 'react';
import './styles.css';
import { MenuBook, Logout } from '@mui/icons-material';
import { DISCIPLINES } from '../../constants/disciplines';
import DropDownMenu from '../dropdownMenu/DropDownMenu';
import CreateGroup from '../createGroup';
import { useGlobalContext } from '../../context';
import logo from '../../assets/images/logo2.png';
import { logout } from '../../services/firebase';
const Header: React.FC = () => {
    const [headerTitle, setHeaderTitle] = useState('');
    const { setCurrentPage } = useGlobalContext();
    const loggedIn = localStorage.getItem('loggedIn');
    return (
        <div className="header">
            <div className="header-section left">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
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
                {loggedIn && (
                    <Logout
                        onClick={() => {
                            logout(() => setCurrentPage('login'));
                        }}
                        className="icon-logout"
                    />
                )}
            </div>
        </div>
    );
};

export default Header;
