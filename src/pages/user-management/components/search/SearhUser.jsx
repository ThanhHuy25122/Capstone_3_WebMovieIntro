import React from "react";
import { Modal } from "antd";
import { Search } from "../components";

export default function UserSearch({ onSearch }) {
  const handleSearch = (value) => {
    if (!value) {
      Modal.info({ message: "Please enter a search term" });
      return;
    }
    onSearch(value);
  };

  return (
    <Search
      placeholder="Enter a name or username"
      enterButton="Search"
      size="large"
      onSearch={handleSearch}
    />
  );
}
