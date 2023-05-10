import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import AnimeCardsSkeleton from "../skeletons/AnimeCardsSkeleton";

import "swiper/css";
import "swiper/css/scrollbar";

function AnilistCards(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  let FetchQuery = `
query ($perPage: Int, $page: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(sort: ${props.criteria}, type: ${props.type}) {
      idMal
      id
      title {
        romaji
        english
        userPreferred
      }
      coverImage {
        medium
        large
        extraLarge
      }
      episodes
    }
  }
}`;

  async function getData() {
    window.scrollTo(0, 0);
    let anilist = await axios({
      url: process.env.REACT_APP_BASE_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: JSON.stringify({
        query: FetchQuery,
        variables: {
          page: 1,
          perPage: props.count,
        },
      }),
    }).catch((err) => {
      console.log(err);
    });

    setData(anilist.data.data.Page.media);
    setLoading(false);
  }
  return (
    <div>
      {loading && <AnimeCardsSkeleton />}
      {!loading && (
        <Swiper
          slidesPerView={7}
          spaceBetween={35}
          scrollbar={{
            hide: false,
          }}
          breakpoints={{
            "@0.00": {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            "@0.75": {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 4,
              spaceBetween: 35,
            },
            "@1.30": {
              slidesPerView: 5,
              spaceBetween: 35,
            },
            "@1.50": {
              slidesPerView: 7,
              spaceBetween: 35,
            },
          }}
          modules={[Scrollbar]}
          className="mySwiper"
        >
          {data.map((item, i) => (
            <SwiperSlide key={item.id + props.criteria}>
              <Wrapper>
                <Link aria-label="Anime Card" to={"id/" + item.id}>
                  <img
                    src={item.coverImage.large}
                    alt={item.title.userPreferred.substring(0, 6)}
                  />
                </Link>
                <p>
                  {item.title.english !== null
                    ? item.title.english.substring(0, 35) + "... "
                    : item.title.userPreferred.substring(0, 35) + "... "}
                </p>
              </Wrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

const Wrapper = styled.div`
  img {
    width: 160px;
    height: 235px;
    border-radius: 0.5rem;
    margin-bottom: 0.3rem;
    object-fit: cover;
    @media screen and (max-width: 600px) {
      width: 120px;
      height: 180px;
    }
    @media screen and (max-width: 400px) {
      width: 100px;
      height: 160px;
    }
  }

  p {
    color: white;
    font-size: 1rem;
    font-weight: 400;
  }
`;

export default AnilistCards;
