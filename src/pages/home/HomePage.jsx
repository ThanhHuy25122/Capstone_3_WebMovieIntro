import React from "react";
import MyCarousel from "./components/carousel/MyCarousel";
import MovieList from "./components/movie-list/MovieList";
import News from "./components/news/News";

export default function HomePage() {
  return (
    <>
      <div
        className="py-5"
        style={{
          overflow: "hidden",
        }}
      >
        <MyCarousel />
        <MovieList />
        <News />
      </div>
    </>
  );
}
