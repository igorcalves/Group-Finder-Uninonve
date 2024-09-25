import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

interface DropDownMenuProps {
    setHeaderTitle: (headerTitle: string) => void;
    content: string[];
    IconComponent: React.ElementType;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
    setHeaderTitle,
    content,
    IconComponent,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="header-section right" ref={dropdownRef}>
            <IconComponent className="icon-book" onClick={toggleDropdown} />
            {isDropdownOpen && (
                <div className="dropdown-menu">
                    <ul>
                        {content.map((discipline: string) => (
                            <li
                                key={discipline}
                                onClick={() => setHeaderTitle(discipline)}
                            >
                                {discipline}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropDownMenu;
