import React from "react";
import { Modal } from "antd";
import Search from "antd/es/input/Search";

export default function SearchUser({ setKeyword }) {
  const handleSearch = async (value) => {
    if (!value && value !== "") {
      Modal.warning({ title: "Please enter a search term" });
      return;
    }
    await setKeyword(!value ? "" : encodeURIComponent(value));
  };

  const handleKeyPress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
      Modal.warning({
        title: "Tài khoản không có dấu cách",
      });
    }
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
