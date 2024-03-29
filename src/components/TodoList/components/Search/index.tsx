import { FaSearch } from 'react-icons/fa';
import { ChangeEvent, useContext } from 'react';
import { SearchContainer, SearchIconWrapper, StyledInputBase } from './style';
import { TaskContext } from '@/contexts/TaskContext';

export default function Search(): JSX.Element {
    const { setSearchTasks } = useContext(TaskContext);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const searchTask = event.target.value;
        setSearchTasks(searchTask);
    };

    return (
        <SearchContainer className="header__search">
            <SearchIconWrapper>
                <FaSearch />
            </SearchIconWrapper>
            <StyledInputBase onChange={handleChange} placeholder="Procurar" aria-label="search" />
        </SearchContainer>
    );
}
