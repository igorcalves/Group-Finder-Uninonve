import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import { GroupNotification } from '../../domain/notifications';
import {
    addMember,
    getGroup,
    updateNotificationInRealTime,
} from '../../services/firebase';
import { v4 as uuidv4 } from 'uuid';
interface DropDownMenuProps {
    content?: GroupNotification[] | undefined;
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
    const [notifications, setNotifications] = useState<
        GroupNotification[] | undefined
    >();
    const id = localStorage.getItem('user');

    useEffect(() => {
        if (id) updateNotificationInRealTime(setNotifications, id);

        return () => {
            if (id) updateNotificationInRealTime(setNotifications, id);
        };
    }, []);

    const toggleMenu = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
        if (notifications) {
            const updatedNotifications = notifications.map((notification) => ({
                ...notification,
                read: true,
            }));
            setNotifications(updatedNotifications);
        }
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
        if (notifications) {
            const newNotifications = notifications.filter(
                (notification) => !notification.read
            );
            setHasNewNotifications(newNotifications.length > 0);
        }
    };

    const removeNotification = (id: string) => {
        if (notifications) {
            const newNotifications = notifications.filter(
                (notification) => notification.id !== id
            );
            setNotifications(newNotifications);
        }
    };

    const addMemberToProject = (notification: GroupNotification) => {
        if (id) {
            getGroup(id).then((group) => {
                if (group && group.members && notification.user) {
                    group.members.push(notification.user);
                    addMember(group, notification.user);
                }
            });
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        hasNewNotification();
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [notifications]);

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
                {notifications && (
                    <ul>
                        {notifications.map((item) => (
                            <li key={uuidv4()}>
                                <h3>{item.title}</h3>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '20px',
                                    }}
                                >
                                    <p>{item.description}</p>

                                    <div className="container-buttons">
                                        <p
                                            onClick={() => {
                                                addMemberToProject(item);
                                                removeNotification(item.id);
                                            }}
                                        >
                                            Aceitar
                                        </p>
                                        <p
                                            onClick={() => {
                                                removeNotification(item.id);
                                            }}
                                        >
                                            Rejeitar
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DropDownMenu;
