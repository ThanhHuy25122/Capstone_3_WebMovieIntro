import React from "react";
import MyCarousel from "./components/carousel/MyCarousel";
import MovieStar from "./components/moive-star/MovieStar";
import MovieList from "./components/movie-list/MovieList";
import News from "./components/news/News";

export default function HomePage() {
  return (
    <>
      <div
        style={{
          overflow: "hidden",
        }}
      >
        <MyCarousel />
        <MovieList />
        <News />
        <MovieStar />
      </div>
    </>
  );
}
