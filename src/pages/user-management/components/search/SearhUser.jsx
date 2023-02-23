import { notification } from "antd";
import Search from "antd/es/transfer/search";
import React, { useState } from "react";

export default function HandleSearchUser(props) {
  const [searchUserState, setSearchUserState] = useState([]);

  const handleSearch = ({ onSearch }) => {
    return (
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    );
  };

  const handleSearchUser = (value) => {
    const filteredUsers = props.userList?.filter(
      (user) =>
        user.hoTen.toLowerCase().includes(value.toLowerCase()) ||
        user.taiKhoan.toLowerCase().includes(value.toLowerCase())
    );
    setSearchUserState(filteredUsers);
    if (filteredUsers.length <= 0) {
      notification.info("No search results");
    }
  };
  return (
    <div>
      <Search
        placeholder="Search movies"
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
      />
      <UserList
        movieList={searchUserState.length ? searchUserState : props.movieList}
      />
    </div>
  );
}
