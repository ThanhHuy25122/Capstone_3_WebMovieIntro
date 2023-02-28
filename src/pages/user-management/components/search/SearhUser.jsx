import React from "react";
import { Modal } from "antd";
import Search from "antd/es/input/Search";

export default function SearchUser({ setKeyword }) {
  const handleSearch = async (value) => {
    console.log(value);
    if (!value && value !== "") {
      Modal.warning({ title: "Please enter a search term" });
      return;
    }
    await setKeyword(!value ? "" : encodeURIComponent(value));
  };

  return (
    <>
      <Search
        key="search"
        placeholder="Enter a name or username"
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
      />
    </>
  );
}
