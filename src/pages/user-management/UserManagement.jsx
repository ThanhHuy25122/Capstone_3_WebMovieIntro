import React, { useState } from "react";
import { Modal } from "antd";
import { useUserList } from "hooks/useUserList";
import Search from "antd/es/input/Search";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UserTable from "./components/user-table/UserTable";

export default function UserManagement() {
  const [searchUserState, setSearchUserState] = useState([]);
  const [userList, getUserList] = useUserList();
  const navigate = useNavigate();

  const columns = [
    {
      title: "Full Name",
      dataIndex: "hoTen",
    },
    {
      title: "Username",
      dataIndex: "taiKhoan",
    },
    {
      title: "Password",
      dataIndex: "matKhau",
    },
    {
      title: "Phone Number",
      dataIndex: "soDT",
      render: (text) => <a href={`tel:${text}`}>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Type",
      dataIndex: "maLoaiNguoiDung",
    },
  ];

  const handleSearchUser = (value) => {
    const filteredUsers = userList?.filter(
      (user) =>
        user.hoTen.toLowerCase().includes(value.toLowerCase()) ||
        user.taiKhoan.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredUsers.length <= 0) {
      Modal.info({ message: "No search results" });
    } else {
      setSearchUserState(filteredUsers);
    }
  };

  const data = searchUserState.length > 0 ? searchUserState : userList;

  return (
    <>
      <p />
      <FormOutlined
        className="add-icon"
        onClick={() => navigate("/admin/user-management/add")}
      />
      <p />
      <Search onSearch={handleSearchUser} />
      <p />
      <UserTable columns={columns} data={data} getUserList={getUserList} />
    </>
  );
}
