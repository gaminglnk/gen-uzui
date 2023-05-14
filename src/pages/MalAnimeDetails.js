import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import AnimeDetailsSkeleton from "../components/skeletons/AnimeDetailsSkeleton";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { searchByIdQuery } from "../hooks/searchQueryStrings";
import { META } from "@consumet/extensions";
import toast from "react-hot-toast";
import YouTube from "../components/VideoPlayer/YouTube";

function MalAnimeDetails() {
  let { id } = useParams();
  const [showAllButtons, setShowAllButtons] = useState(false);

  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const [anilistResponse, setAnilistResponse] = useState();
  const [consumeResponse, setConsumeResponse] = useState();
  const [expanded, setExpanded] = useState(false);
  const [mal, setMal] = useState();
  const [notAvailable, setNotAvailable] = useState(false);
  const [group, setGroup] = useState(1);

  useEffect(() => {
    getInfo();
  }, []);

  function readMoreHandler() {
    setExpanded(!expanded);
  }

  async function getInfo() {
    if (id === "null") {
      setNotAvailable(true);
      return;
    }
    try {
    const aniRes = await axios({
      url: process.env.REACT_APP_BASE_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: searchByIdQuery,
        variables: {
          id,
        },
      },
    });

    setAnilistResponse(aniRes.data.data.Media);
    setMal(aniRes.data.data.Media.idMal);

    let fetchEpisodes = new META.Anilist();
    let data;
      
    try {
      data = await fetchEpisodes.fetchEpisodesListById(id);
    } catch (error) {
      console.log(error);
      toast.error('Error occured, using fallback...', {
        duration: 3000,
      });

      const fallbackRes = await axios.get(`https://zoro-engine.vercel.app/meta/anilist/episodes/${id}`);
      data = fallbackRes.data;
    }
      
    if (data.length === 0) {
      setNotAvailable(true);
    } else {
      const filteredData = data.filter((episode) => episode.number !== 0);
      setConsumeResponse(filteredData);
    }

    console.log('Meta response (for devs):', data);
  } catch (err) {
    console.log(err);
    setNotAvailable(true);
    toast.error('An error occured while fetching data', {
      duration: 5000,
    });
  }

  setLoading(false);
  }
  
  const Genre = ({ genre }) => {
  const genreLink = `https://anilist.co/search/anime?genres=${genre}`;

  return (
    <GenreButton key={genre} to={`/genre/${genre}`} >
      {genre}
    </GenreButton>
  );
  };

  const groupSize = consumeResponse?.length <= 100 ? 25 : 50;
  const totalGroups = Math.ceil((consumeResponse ?? []).length / groupSize);
  const visibleButtons = showAllButtons
    ? totalGroups
    : Math.min(totalGroups, MAX_VISIBLE_BUTTONS);

  const renderGroupButtons = () => {
    const buttons = [];
    for (let i = 1; i <= visibleButtons; i++) {
      const startSerial = (i - 1) * groupSize + 1;
      const endSerial = Math.min(i * groupSize, (consumeResponse ?? []).length);
      const buttonName = `${endSerial}`;
      buttons.push(
        <Sort key={i} onClick={() => setGroup(i)}>
          {buttonName}
        </Sort>
      );
    }
    return buttons;
  };

  return (
    <div>
      {notAvailable && (
        <NotAvailable>
          <img src="./assets/404.png" alt="404" />
          <h1>Oops! Looks like this isn't available.</h1>
        </NotAvailable>
      )}
      {loading && !notAvailable && <AnimeDetailsSkeleton />}
      {!loading && !notAvailable && (
        <Content>
          {anilistResponse !== undefined && (
            <div>
              <Banner
                src={
                  anilistResponse.bannerImage !== null
                    ? anilistResponse.bannerImage
                    : "https://cdn.wallpapersafari.com/41/44/6Q9Nwh.jpg"
                }
                alt="Banner Img"
              />
              <ContentWrapper>
                <Poster>
                  <img src={anilistResponse.coverImage.extraLarge} alt="" />
                  <Button
                    key="binge-now"
                    to={`/watch/${id}/${consumeResponse[0].id}`}
                  >
                    Binge Now
                  </Button>
                  <MyAnimeList
                    className="outline"
                    href={"https://myanimelist.net/anime/" + mal}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MyAnimeList
                  </MyAnimeList>
                </Poster>
                <div>
                  <h1>{anilistResponse.title.userPreferred}</h1>
                  {anilistResponse.title.english != null && (
                    <h3>{"English - " + anilistResponse.title.english}</h3>
                  )}
                  <p>
                    <span>Type: </span>
                    {anilistResponse.type}
                  </p>
                  {width <= 600 && expanded && (
                    <section>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: `<span>Plot Summary: </span>${anilistResponse.description}`,
                        }}
                      ></p>
                      <button onClick={() => readMoreHandler()}>
                        read less
                      </button>
                    </section>
                  )}
                  {width <= 600 && !expanded && (
                    <p>
                      <span>Plot Summary: </span>
                      {anilistResponse.description.substring(0, 200) + "... "}
                      <button onClick={() => readMoreHandler()}>
                        read more
                      </button>
                    </p>
                  )}
                  {width > 600 && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          "<span>Plot Summary: </span>" +
                          anilistResponse.description,
                      }}
                    ></p>
                  )}
                  <p>
                    <span>Genre: </span>
                    <GenreContainer>
                      {anilistResponse.genres.map((genre, index) => ( <Genre key={index} genre={genre} /> ))}
                    </GenreContainer>
                  </p>
                  <p>
                    <span>Released: </span>
                    {anilistResponse.startDate.year}
                  </p>
                  <p>
                    <span>Avg Score: </span>
                    {anilistResponse.averageScore / 10}
                  </p>
                  <p>
                    <span>Episodes: </span>
                    {anilistResponse.episodes}
                  </p>
                  <p>
                    <span>Status: </span>
                    {anilistResponse.status}
                  </p>
                </div>
              </ContentWrapper>
              <Episode>
                {anilistResponse.trailer?.id && (
                 <>
                   <Trail>
                     <YouTube id={anilistResponse.trailer.id} />
                   </Trail>
                   <div style={{ height: "1px", backgroundColor: "#393653", borderRadius: "2px", margin: "10px 0", }} ></div>
                 </>
                )}
                <br></br>
                <span style={{ textAlign: 'left', marginBottom: '0.35rem' }}>Episodes »</span>
                <DubContainer>
                  <Sorter>
                    <div>{renderGroupButtons()}{totalGroups > MAX_VISIBLE_BUTTONS && ( <ShowAllButton onClick={() => setShowAllButtons(!showAllButtons)}> {showAllButtons ? 'Show Less' : 'Show All'} </ShowAllButton> )}</div>
                  </Sorter>
                </DubContainer>
                <br></br>
                {width > 600 && (
                  <Episodes>
                    {consumeResponse
                      .slice((group - 1) * groupSize, group * groupSize) // Get episodes for the selected group
                      .map((episode, i) => (
                        <EpisodeLink
                          key={episode.id}
                          to={`/watch/${id}/${episode.id}`}
                        >
                          Episode {i + 1 + (group - 1) * groupSize}
                        </EpisodeLink>
                      ))}
                  </Episodes>
                )}
                {width <= 600 && (
                  <Episodes>
                    {consumeResponse
                      .slice((group - 1) * groupSize, group * groupSize) // Get episodes for the selected group
                      .map((episode, i) => (
                        <EpisodeLink
                          key={episode.id}
                          to={`/watch/${id}/${episode.id}`}
                        >
                          {i + 1 + (group - 1) * groupSize}
                        </EpisodeLink>
                      ))}
                  </Episodes>
                )}
              </Episode>
            </div>
          )}
        </Content>
      )}
    </div>
  );
}

const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  max-width: 100%;
  overflow-x: hidden;
`;

const GenreButton = styled(Link)`
  color: white;
  font-size: 0.95rem;
  font-family: "Lexend", sans-serif;
  background: #242235;
  padding: 0.4rem 0.65rem 0.4rem 0.65rem;
  margin: 0 2px;
  border-radius: 2px;
  border: 1px solid #393653;
  text-decoration: none;
  transition: 0.1s;

  :hover {
    transform: scale(0.95);
    background-color: #7676ff;
  }
`;

const MAX_VISIBLE_BUTTONS = 10;
const ShowAllButton = styled.button`
  background: none;
  border: none;
  color: #7676ff;
  font-size: 0.95rem;
  font-family: "Lexend", sans-serif;
  cursor: pointer;
  margin-left: auto;
  padding: 0.4rem 0.65rem;
  transition: 0.1s;
  :hover {
    transform: scale(0.95);
    color: #393653;
  }
`;

const Sorter = styled.div`
  position: relative;
  background: #242235;
  border: 1px dashed #393653;
  border-radius: 6px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center align the buttons */
  align-items: center;
  padding: 10px;
  margin-top: 1.5rem;
  gap: 5px;

  h2 {
    margin-bottom: 10px;
  }

  button {
    flex: 0 0 calc(33.33% - 10px);
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    button {
      flex: 0 0 calc(50% - 5px);
    }
  }
`;

const Sort = styled.button`
  color: white;
  font-size: 0.95rem;
  font-family: "Lexend", sans-serif;
  background: #242235;
  padding: 0.4rem 0.65rem 0.4rem 0.65rem;
  margin: 0 2px;
  border-radius: 2px;
  border: 1px solid #393653;
  text-decoration: none;
  transition: 0.1s;

  :hover {
    transform: scale(0.95);
    background-color: #7676ff;
  }
`;

const Trail = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%;
  border: 2px solid #272639;
  border-radius: 0.4rem;
`;

const NotAvailable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  img {
    width: 30rem;
  }

  h1 {
    margin-top: -2rem;
    font-weight: normal;
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    img {
      width: 18rem;
    }

    h1 {
      font-size: 1.3rem;
    }
  }
`;

const DubContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.5rem;

  .switch {
    position: relative;

    label {
      display: flex;
      align-items: center;
      font-family: "Lexend", sans-serif;
      font-weight: 400;
      cursor: pointer;
      margin-bottom: 0.3rem;
    }

    .label {
      margin-bottom: 0.7rem;
      font-weight: 500;
    }

    .indicator {
      position: relative;
      width: 60px;
      height: 30px;
      background: #242235;
      border: 2px solid #393653;
      display: block;
      border-radius: 30px;
      margin-right: 10px;
      margin-bottom: 10px;

      &:before {
        width: 22px;
        height: 22px;
        content: "";
        display: block;
        background: #7676ff;
        border-radius: 26px;
        transform: translate(2px, 2px);
        position: relative;
        z-index: 2;
        transition: all 0.5s;
      }
    }
    input {
      visibility: hidden;
      position: absolute;

      &:checked {
        & + .indicator {
          &:before {
            transform: translate(32px, 2px);
          }
          &:after {
            width: 54px;
          }
        }
      }
    }
  }
`;

const Episode = styled.div`
  margin: 0 4rem 0 4rem;
  padding: 2rem;
  outline: 2px solid #272639;
  border-radius: 0.5rem;
  color: white;

  h2 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  box-shadow: 0px 4.41109px 20.291px rgba(16, 16, 24, 0.81);

  @media screen and (max-width: 600px) {
    padding: 1rem;
    margin: 1rem;
  }
`;

const Episodes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 1rem;
  grid-row-gap: 1rem;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
  }
`;

const EpisodeLink = styled(Link)`
  text-align: center;
  color: white;
  text-decoration: none;
  background-color: #242235;
  padding: 0.9rem 2rem;
  font-weight: 500;
  border-radius: 0.5rem;
  border: 1px solid #393653;
  transition: 0.2s;

  :hover {
    background-color: #7676ff;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
    border-radius: 0.3rem;
    font-weight: 500;
  }
`;

const Content = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  position: relative;

  @media screen and (max-width: 600px) {
    margin: 1rem;
  }
`;

const ContentWrapper = styled.div`
  padding: 0 3rem 0 3rem;
  display: flex;

  div > * {
    margin-bottom: 0.6rem;
  }

  div {
    margin: 1rem;
    font-size: 1rem;
    color: #b5c3de;
    span {
      font-weight: 700;
      color: white;
    }
    p {
      font-weight: 300;
      text-align: justify;
    }
    h1 {
      font-weight: 700;
      color: white;
    }
    h3 {
      font-weight: 500;
    }
    button {
      display: none;
    }
  }

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column-reverse;
    padding: 0;
    div {
      margin: 1rem;
      margin-bottom: 0.2rem;
      h1 {
        font-size: 1.6rem;
      }
      p {
        font-size: 1rem;
      }
      button {
        display: inline;
        border: none;
        outline: none;
        background-color: transparent;
        text-decoration: underline;
        font-weight: 700;
        font-size: 1rem;
        color: white;
      }
    }
  }
`;

const Poster = styled.div`
  display: flex;
  flex-direction: column;
  img {
    width: 220px;
    height: 300px;
    border-radius: 0.5rem;
    margin-bottom: 2.3rem;
    position: relative;
    top: -20%;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
  }
  @media screen and (max-width: 600px) {
    img {
      display: none;
    }
  }

  .outline {
    background-color: transparent;
    border: 2px solid #9792cf;
  }
`;

const Button = styled(Link)`
  font-size: 1.2rem;
  padding: 1rem 3.4rem;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: #7676ff;
  font-weight: 700;
  border-radius: 0.4rem;
  position: relative;
  top: -25%;
  white-space: nowrap;

  @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
  }
`;

const MyAnimeList = styled.a`
  font-size: 1.2rem;
  padding: 1rem 3.4rem;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: #7676ff;
  font-weight: 700;
  border-radius: 0.4rem;
  position: relative;
  top: -25%;
  white-space: nowrap;

  @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
  }
`;

const Banner = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-radius: 0.7rem;

  @media screen and (max-width: 600px) {
    height: 13rem;
    border-radius: 0.5rem;
  }
`;

export default MalAnimeDetails;
