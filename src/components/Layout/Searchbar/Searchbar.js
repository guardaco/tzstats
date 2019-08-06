import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import useKeyPress from '../../../hooks/useKeyPress';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { getSearchType, capitalizeFirstLetter } from '../../../utils';
import Autocomplete from './Autocomplete';

const Searchbar = ({ history }) => {
  const [value, setValue] = React.useState('');
  const [isFocus, setIsFocus] = React.useState(false);
  const [isMouseEnter, setIsMouseEnter] = React.useState(false);
  const [enterPress, setKeyPressed] = useKeyPress(13);
  const [suggestions, setSuggestions] = useLocalStorage('suggestions', []);

  const search = searchValue => {
    if (searchValue) {
      setKeyPressed(false);
      setValue('');
      setIsMouseEnter(true);
      setIsFocus(false);
      let searchType = getSearchType(searchValue);
      let newSuggestions = suggestions.filter(r => r.value !== searchValue);
      newSuggestions.unshift({ type: capitalizeFirstLetter(searchType), value: searchValue });
      setSuggestions(newSuggestions);
      searchValue && history.push(`/${searchType}/${searchValue}`);
    }
  };

  return (
    <SearchContainer>
      <SearchWrapper>
        {enterPress && search(value)}
        <SearchInput
          type="text"
          value={value || ''}
          onChange={e => setValue(e.target.value)}
          onFocus={e => setIsFocus(true)}
          onBlur={e => !isMouseEnter && setIsFocus(false)}
          placeholder="Explore blocks, operations, accounts, elections, and cycles …"
        />
        <CleanInput onClick={e => setValue('')}>&#8855;</CleanInput>
      </SearchWrapper>
      <Autocomplete
        suggestions={suggestions}
        isFocus={isFocus}
        handleSearch={search}
        cleanSuggestions={e => setSuggestions([])}
        onMouseLeave={e => setIsMouseEnter(false)}
        onMouseEnter={e => setIsMouseEnter(true)}
      />
    </SearchContainer>
  );
};
const CleanInput = styled.div`
  background: #30313b;
  font-size: 25px;
  padding: 0 5px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 20px 0;
`;
const SearchWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  padding: 4px;
  border-radius: 3px;
  color: rgba(255, 255, 255, 0.42);
  background-color: #30313b;
  align-content: flex-end;
`;
const SearchInput = styled.input`
  padding: 8px 16px;
  flex-grow: 1;
  font-size: 16px;
  font-weight: 100;
  color: rgba(255, 255, 255, 0.52);
  background: transparent;
  border: none;
  outline: none;
`;

export default withRouter(Searchbar);