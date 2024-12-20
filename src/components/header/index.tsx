import React from 'react';
import './styles.css';
import { Logout } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useGlobalContext } from '../../context';
import logo from '../../assets/images/logo2.png';
import { logout } from '../../services/firebase';
import DropDownMenu from '../dropdownMenu/DropDownMenu';
// import { getNotifications } from '../../services/firebase';
const Header: React.FC = () => {
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
                <h1>Projeto</h1>
            </div>
            <div className="header-section right">
                {/* <CreateGroup />
                <DropDownMenu
                    setHeaderTitle={setHeaderTitle}
                    content={DISCIPLINES}
                    IconComponent={MenuBook}
                /> */}

                {loggedIn ? (
                    <div className="icons">
                        <DropDownMenu IconComponent={NotificationsIcon} />
                        <Logout
                            onClick={() => {
                                logout(() => setCurrentPage('login'));
                            }}
                            className="icon-logout"
                        />
                    </div>
                ) : (
                    <p
                        className="login"
                        onClick={() => {
                            setCurrentPage('login');
                        }}
                    >
                        Login
                    </p>
                )}
            </div>
        </div>
    );
};

export default Header;
