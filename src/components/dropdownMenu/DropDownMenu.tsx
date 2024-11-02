import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import { Notification } from '../../domain/notifications';
import { notifications } from '../../utils/mocks';
import { toast } from 'react-toastify';

interface DropDownMenuProps {
    content: Notification[] | undefined;
    IconComponent: React.ElementType;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
    content,
    IconComponent,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const [hasNewNotifications, setHasNewNotifications] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
        content?.map((notification) => {
            notification.read = true;
        });

        setHasNewNotifications(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node) &&
            iconRef.current &&
            !iconRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    const hasNewNotification = () => {
        if (content) {
            const newNotifications = content.filter(
                (notification) => !notification.read
            );

            setHasNewNotifications(newNotifications.length > 0);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        hasNewNotification();
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="header-section right">
            <div className="icon-container" ref={iconRef}>
                {hasNewNotifications && (
                    <span className="notification-dot">*</span>
                )}
                <IconComponent className="icon-book" onClick={toggleMenu} />
            </div>
            <div
                className={`dropdown-menu ${isOpen ? 'open' : 'closed'}`}
                ref={menuRef}
            >
                {content && (
                    <ul>
                        {content.map((item) => (
                            <li key={item.id}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DropDownMenu;
