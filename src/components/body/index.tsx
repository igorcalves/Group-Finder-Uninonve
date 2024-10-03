import React, { useEffect, useState, useMemo } from 'react';
import CardGroup from '../cardGroup';
import './styles.css';
import PrimaryInput from '../input';
import { useGlobalContext } from '../../context';
import { Pagination } from '@mui/material';

const Body: React.FC = () => {
    const { groups, setGroups } = useGlobalContext();
    const [search, setSearch] = useState('');
    const [filteredGroups, setFilteredGroups] = useState(groups);
    const [page, setPage] = useState(1);
    const groupsPerPage = 10;

    const searchForGroups = (search: string) => {
        return groups.filter((group) => {
            return group.name.toLowerCase().includes(search.toLowerCase());
        });
    };

    useEffect(() => {
        setFilteredGroups(handleSearch(search));
    }, [search, groups]);

    const handleSearch = (search: string) => {
        if (search === '') {
            return groups;
        }
        return searchForGroups(search);
    };

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    const handleUpdateGroup = (updatedGroup: any) => {
        const updatedGroups = groups.map((group) =>
            group.id === updatedGroup.id ? updatedGroup : group
        );
        setGroups(updatedGroups);
    };

    const paginatedGroups = useMemo(() => {
        const startIndex = (page - 1) * groupsPerPage;
        const endIndex = startIndex + groupsPerPage;
        return filteredGroups.slice(startIndex, endIndex);
    }, [page, filteredGroups]);

    return (
        <div className="body">
            <div className="input-container">
                <PrimaryInput
                    setContent={setSearch}
                    placeholder="Buscar Grupos"
                    widthP="800px"
                />
            </div>
            <div className="groups-cards-container">
                <div className="groups-cards">
                    {paginatedGroups.map((filteredGroup) => (
                        <CardGroup
                            key={filteredGroup.id}
                            group={filteredGroup}
                            onUpdateGroup={handleUpdateGroup}
                        />
                    ))}
                </div>
            </div>
            <div className="pagination-container">
                <Pagination
                    count={Math.ceil(filteredGroups.length / groupsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                />
            </div>
        </div>
    );
};

export default Body;
