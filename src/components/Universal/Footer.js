import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const LogoText = styled.h1`
  font-family: "Lexend", sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-family: "Lexend", sans-serif;
  font-size: 0.9rem;
  margin-bottom: 2rem;
`;

const FootLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const FootLink = styled(Link)`
  text-decoration: none;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ffffff;
  }
`;

const Footer = () => {
  return (
    <div style={{ height: "1px", backgroundColor: "#393653", borderRadius: "2px", margin: "1.5rem 0", }} ></div>
    <FooterContainer>
      <LogoText>kimitsu</LogoText>
      <Description>
        &copy; {new Date().getFullYear()} kimitsu. | React app made with ❤️
      </Description>
      <FootLinks>
        <FootLink to="/popular/1">Popular Anime</FootLink>
        <FootLink to="/genre/Action">Action Anime</FootLink>
        <FootLink to="/movies/1">Movies</FootLink>
        <FootLink to="/trending/1">Latest Shows</FootLink>
        <FootLink to="/dmca">DMCA</FootLink>
        <FootLink to="https://github.com/gaminglnk/">Github</FootLink>
      </FootLinks>
      <Description>
        This site does not store any files on our server, we only link to the
        media which is hosted on 3rd party services.
      </Description>
    </FooterContainer>
  );
};

export default Footer;
