import styled from "styled-components";
import { CgSearch } from "react-icons/cg";
import { Colors, Devices } from "../Theme";
const SearchBarEl = styled.article`
  background-color: ;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
  height: 100%;
  max-width: 480px;
  flex: 1;
  align-items: center;
  display: none;
  

  @media ${Devices.Laptop} {
    display: flex;
  }
`;

const SearchBarBg = styled.div`
  background-color: ${Colors.White};
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
  border-radius: 20px;
  padding: 0.5rem 0.7rem;
  box-shadow: 0px 0px 0px 1px rgb(0 0 0 / 4%), 0px 2px 3px rgb(0 0 0 / 7%), 0px 6px 6px rgb(0 0 0 / 4%), 0px 12px 12px rgb(0 0 0 / 3%), 0px 20px 24px rgb(0 0 0 / 3%);


  svg {
    font-size: 1.5rem;
    color: #6eb855;
  }
`;

const SearchInput = styled.input`
  border: none;
  font-size: 1.15rem;
  flex: 1;
  :focus {
    outline: none;
  }
`;

export default function SearchBar() {
  return (
    <SearchBarEl>
      <SearchBarBg>
        <CgSearch />
        <SearchInput placeholder="Search collectibles and collections" />
      </SearchBarBg>
    </SearchBarEl>
  );
}
