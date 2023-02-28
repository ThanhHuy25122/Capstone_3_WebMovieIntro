import React from "react";
import { Modal } from "antd";
import Search from "antd/es/input/Search";

export default function SearchMovie({ onSearch }) {
  const handleSearch = (value) => {
    if (!value) {
      Modal.info({ title: "Please enter a search term" });
      return;
    }
    onSearch(value);
  };

  return (
    <Search
      placeholder="Enter a name movie"
      enterButton="Search"
      size="large"
      onSearch={handleSearch}
    />
  );
}
