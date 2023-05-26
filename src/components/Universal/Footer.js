import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterContainer = styled.section`
  color: #dbdcdd;
  background-color: #0c0d10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 12rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
  }
`;

const ContentContainer = styled.div`
  width: 80%;
  margin: 0 auto;

  @media (min-width: 1024px) {
    width: 95%;
  }

  @media (min-width: 1280px) {
    width: 80%;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (min-width: 1024px) {
    gap: 10px;
  }
`;

const LogoText = styled.h1`
  font-family: 'Lexend', sans-serif;
  font-size: 40px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const InfoText = styled.p`
  font-family: 'Lexend', sans-serif;
  font-size: 0.8rem;
  color: #9c9c9c;
  width: 520px;
  font-style: italic;
  margin-top: 0.5rem;

  @media (min-width: 1024px) {
    font-size: 0.81rem;
  }
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 5.94rem;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li`
  cursor: pointer;
  color: #a7a7a7;

  &:hover {
    color: #action;
  }
`;

function Footer() {
  const [year] = useState(new Date().getFullYear());
  const [season] = useState(getCurrentSeason());

  return (
    <FooterContainer>
      <ContentContainer>
        <LogoContainer>
          <LogoText>kimitsu</LogoText>
          {/* Uncomment the following code if you want to include an Image */}
          {/* <Img
            src="https://i1210.photobucket.com/albums/cc417/kusanagiblog/NarutoVSSasuke.gif"
            alt="gambar"
            title="request nya rapip yulistian"
            width={210}
            height={85}
          /> */}
        </LogoContainer>
        <InfoContainer>
          <div>
            <p style={{ fontFamily: "'Lexend', sans-serif", fontSize: "0.81rem", color: "#CCCCCC", margin: 0 }}>
              &copy; {year} kimitsu. | React app made with ❤️
            </p>
            <InfoText>
              This site does not store any files on our server, we only link to
              the media which is hosted on 3rd party services.
            </InfoText>
          </div>
        </InfoContainer>
      </ContentContainer>
      <ContentContainer>
        <NavContainer>
          <NavList>
            <NavItem>
              <Link to={`/search/anime?season=${season}&seasonYear=${year}`}>
                This Season
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/popular/1">Popular Anime</Link>
            </NavItem>
            <NavItem>
              <Link to="/genre/Action">Action Anime</Link>
            </NavItem>
          </NavList>
          <NavList>
            <NavItem>
              <Link to="/movies/1">Movies</Link>
            </NavItem>
            <NavItem>
              <Link to="/trending/1">Latest Shows</Link>
            </NavItem>
            <NavItem>
              <Link to="/dmca">DMCA</Link>
            </NavItem>
            <NavItem>
              <Link href="https://github.com/gaminglnk/">Github</Link>
            </NavItem>
          </NavList>
        </NavContainer>
      </ContentContainer>
    </FooterContainer>
  );
}

function getCurrentSeason() {
  const now = new Date();
  const month = now.getMonth() + 1; // getMonth() returns 0-based index

  switch (month) {
    case 12:
    case 1:
    case 2:
      return "WINTER";
    case 3:
    case 4:
    case 5:
      return "SPRING";
    case 6:
    case 7:
    case 8:
      return "SUMMER";
    case 9:
    case 10:
    case 11:
      return "FALL";
    default:
      return "UNKNOWN SEASON";
  }
}

export default Footer;
