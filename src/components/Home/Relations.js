import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Relations = ({ anilistData }) => {
  const anilistResponse = anilistData
  const RelatedAnime = styled.div`
    display: flex;
    gap: 1rem;
    margin: 0 1.15rem 1rem 1.15rem;
    padding: 1rem;
    border: 2px solid #272639;
    border-radius: 0.5rem;
    justify-content: flex-start;
    overflow-x: auto;
    white-space: nowrap;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #393653;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-track {
      background: #242235;
    }
  `;

  const AnimeItem = styled.div`
    width: 170px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;

    img {
      width: 160px;
      height: 235px;
      border-radius: 0.5rem;
      margin-bottom: 0.3rem;
      object-fit: cover;
    }

    p {
      width: 160px;
      color: white;
      font-size: 1rem;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.5);
      padding: 0.5rem;
      color: white;
      font-weight: bold;
    }
  `;

  return (
    <>
      {anilistResponse.relations.edges &&
        anilistResponse.relations.edges.some(
          (edge) => edge.relationType === 'PREQUEL' || edge.relationType === 'SEQUEL'
        ) && (
          <RelatedAnime>
            {anilistResponse.relations.edges.map((edge, i) => {
              if (edge.relationType === 'PREQUEL' || edge.relationType === 'SEQUEL') {
                return (
                  <AnimeItem key={i}>
                    <Link aria-label="Related Anime" to={`/id/${edge.node.id}`}>
                      <img
                        src={edge.node.coverImage.large}
                        alt={edge.node.title.userPreferred.substring(0, 7)}
                      />
                      <span className="overlay">
                        {edge.relationType === 'PREQUEL' ? 'PREQUEL' : 'SEQUEL'}
                      </span>
                    </Link>
                    <p>
                      {edge.node.title.english !== null
                        ? edge.node.title.english.substring(0, 20)
                        : edge.node.title.userPreferred.substring(0, 20)}
                    </p>
                  </AnimeItem>
                );
              }
              return null;
            })}
          </RelatedAnime>
        )}
    </>
  );
};

export default Relations;
