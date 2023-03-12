import React from "react";
import { Modal } from "antd";
import Search from "antd/es/input/Search";

export default function SearchMovie({ setKeyword }) {
  const handleSearch = async (value) => {
    if (!value) {
      Modal.info({ title: "Please enter a search term" });
      return;
    }

    await setKeyword(!value ? "" : encodeURIComponent(value));
  };

  return (
    <Search
      key="search"
      placeholder="Enter a name movie"
      enterButton="Search"
      size="large"
      onSearch={handleSearch}
    />
  );
}
