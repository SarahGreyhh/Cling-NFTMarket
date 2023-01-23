import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { CgSearch } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { Colors, Devices } from "./Theme";
import Button from "./styled/Button.styled";
import SearchBar from "./Header/SearchBar";
import SearchBarMob from "./Header/MobileSearchBar";
import { useState } from "react";
import { ConnectButton } from "web3uikit";

const HeaderEl = styled.header`

  z-index: 10;
  display: flex;
  color: ${Colors.White};
  width: 100%;
  align-items: center;
  height: 10%;
  gap: 1rem;
  padding: 0.5rem 1.5rem;
  top: 0;
  background-color: white;
  position: sticky;
  box-shadow: 0px 0px 0px 1px rgb(0 0 0 / 4%), 0px 2px 3px rgb(0 0 0 / 7%), 0px 6px 6px rgb(0 0 0 / 4%), 0px 12px 12px rgb(0 0 0 / 3%), 0px 20px 24px rgb(0 0 0 / 3%);

  svg {
    font-size: 2rem;
    cursor: pointer;
  }
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoText = styled.a`

  font-family: ;
  font-size: 1.5rem;
  font-weight: 500;
  color: #000;
  letter-spacing: 2.5px;
  -webkit-text-fill-color: #f7ac00;
  -webkit-text-stroke-width:0px;


  
`;

const Logo = styled.img`
  width: 45px;
  border-right: 1px solid ${Colors.Gray};
  padding-right: 1rem;
`;

const Nav = styled.nav`
  margin-left: auto;
  border-right: 1px solid ${Colors.Gray};
  padding-right: 1rem;
  display: none;

  ul {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 1rem;
  }

  @media ${Devices.Laptop} {
    display: block;
  }
`;

const NavItem = styled.a`
  font-size: 1rem;
  font-weight: 400;
  color: grey
`;

const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${Devices.Laptop} {
    display: none;
  }
`;
const MenuIcon = styled(SearchIcon)``;

const AuthItems = styled(NavItem)`
  font-size: 1rem;
  display: none;
  @media ${Devices.Laptop} {
    display: inherit;
  }
`;

export default function Header({ mobileMenu }) {
  const { MobileMenuIsOpen, setMobileMenuIsOpen } = mobileMenu;
  const [SearchIsOpen, setSearchIsOpen] = useState(false);

  function toggleMenu() {
    setMobileMenuIsOpen(!MobileMenuIsOpen);
  }

  return (
    <HeaderEl>
      <MenuIcon>
        {MobileMenuIsOpen ? (
          <IoClose
            style={{ fontSize: "2.5rem" }}
            color={Colors.Primary}
            onClick={() => {
              toggleMenu();
            }}
          />
        ) : (
          <FiMenu
            onClick={() => {
              toggleMenu();
            }}
          />
        )}
      </MenuIcon>
      
      <Center>
        <Logo src="/images/cryptoLogo.png" />
        <LogoText href="/">Cling NFT</LogoText>
        <SearchBar />
        <Nav>
          <ul>
            <li>
              <NavItem href="#">Marketplace</NavItem>
            </li>
            <li>
              <NavItem href="/create-nft">Create NFT</NavItem>
            </li>
            <li>
              <NavItem href="/my-nfts">Owned NFTs</NavItem>
            </li>
            <li>
            <ConnectButton/>
            </li>
          </ul>
        </Nav>
      </Center>
      {SearchIsOpen ? (
        <SearchBarMob
          SearchIsOpen={SearchIsOpen}
          setSearchIsOpen={setSearchIsOpen}
        />
      ) : (
        ""
      )}
      
      <SearchIcon>
        <CgSearch
          onClick={() => {
            setSearchIsOpen(!SearchIsOpen);
          }}
        />
      </SearchIcon>
    </HeaderEl>
  );
}
