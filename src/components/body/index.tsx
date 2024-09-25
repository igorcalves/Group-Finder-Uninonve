import React, { useEffect } from 'react';
import CardGroup from '../cardGroup';
import './styles.css';
import PrimaryInput from '../input';
import { useGlobalContext } from '../../context';

const Body: React.FC = () => {
    const { groups } = useGlobalContext();
    const [search, setSearch] = React.useState('');
    const [filteredGroups, setFilteredGroups] = React.useState(groups);

    const searhForGroups = (search: string) => {
        return groups.filter((group) => {
            return group.name.toLowerCase().includes(search.toLowerCase());
        });
    };

    useEffect(() => {
        setFilteredGroups(handleSearch(search));
    }, [search]);

    useEffect(() => {
        setFilteredGroups(groups);
    }, [groups]);

    const handleSearch = (search: string) => {
        if (search === '') {
            return groups;
        }

        return searhForGroups(search);
    };

    return (
        <div className="body">
            <div className="input-container">
                <PrimaryInput
                    setContent={setSearch}
                    placeholder="Buscar Grupos"
                    widthP="800px"
                />
            </div>
            <div className="groups-cards">
                {filteredGroups.length > 0 ? (
                    filteredGroups.map((group) => (
                        <CardGroup key={group.id} group={group} />
                    ))
                ) : (
                    <h1>Não existe nenhum grupo registrado...</h1>
                )}
            </div>
        </div>
    );
};

export default Body;
