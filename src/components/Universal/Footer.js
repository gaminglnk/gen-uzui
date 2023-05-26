import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #0c0d10;
  color: #dbdcdd;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 600px) {
    padding: 2rem 5rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 600px) {
    gap: 1rem;
  }
`;

const LogoText = styled.h1`
  font-family: 'Lexend', sans-serif;
  font-size: 2rem;
  margin: 0;
`;

const ContentContainer = styled.div`
  margin-top: 2rem;

  @media (min-width: 600px) {
    margin-top: 0;
  }
`;

const InfoText = styled.p`
  font-family: 'Lexend', sans-serif;
  font-size: 0.8rem;
  color: #9c9c9c;
  margin: 0;

  @media (min-width: 600px) {
    font-size: 0.9rem;
  }
`;

const NavContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 5rem;
    margin-top: 0;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  font-family: 'Lexend', sans-serif;
`;

const NavLink = styled(Link)`
  color: #a7a7a7;
  text-decoration: none;

  &:hover {
    color: #ffffff;
  }
`;

function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterContainer>
      <LogoContainer>
        <LogoText>kimitsu</LogoText>
      </LogoContainer>
      <ContentContainer>
        <InfoText>
          &copy; {year} kimitsu. | React app made with ❤️
        </InfoText>
        <InfoText>
          This site does not store any files on our server, we only link to
          the media which is hosted on 3rd party services.
        </InfoText>
      </ContentContainer>
      <NavContainer>
        <NavList>
          <NavItem>
            <NavLink to="/popular/1">Popular Anime</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/genre/Action">Action Anime</NavLink>
          </NavItem>
        </NavList>
        <NavList>
          <NavItem>
            <NavLink to="/movies/1">Movies</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/trending/1">Latest Shows</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/dmca">DMCA</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/gaminglnk/">Github</NavLink>
          </NavItem>
        </NavList>
      </NavContainer>
    </FooterContainer>
  );
}

export default Footer;
