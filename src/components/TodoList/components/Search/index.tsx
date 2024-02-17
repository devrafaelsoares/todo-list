import { FaSearch } from 'react-icons/fa';
import { SearchContainer, SearchIconWrapper, StyledInputBase } from './style';
import '@/assets/styles/components/search.sass';

export default function Search(): JSX.Element {
    return (
        <SearchContainer className="header__seach">
            <SearchIconWrapper>
                <FaSearch />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Procurar" aria-label="search" />
        </SearchContainer>
    );
}
