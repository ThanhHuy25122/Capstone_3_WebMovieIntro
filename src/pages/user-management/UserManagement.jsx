import React, { useState } from "react";
import { Modal, notification, Table } from "antd";
import { useUserList } from "hooks/useUserList";
import Search from "antd/es/input/Search";
import { removeUserApi } from "services/user";
import { CloseOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function UserManagement() {
  const [userList, getUserList] = useUserList();
  const navigate = useNavigate();
  const columns = [
    {
      title: "Full Name",
      dataIndex: "hoTen",
      render: (text) => <a href="##">{text}</a>,
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
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Type",
      dataIndex: "maLoaiNguoiDung",
    },
    {
      title: "Actions",
      render: (text) => {
        const handleRemove = async () => {
          try {
            await removeUserApi(text.taiKhoan);
            notification.success({ message: "Delete user successfully" });
            getUserList();
          } catch (error) {
            notification.error({ message: error.response.data.content });
          }
        };

        const handleConfirmRemove = () => {
          Modal.confirm({
            title: "Do you want to delete this user?",
            onOk: handleRemove,
          });
        };

        return (
          <>
            <EditOutlined
              className="update-icon"
              onClick={() =>
                navigate(`/admin/user-management/edit/${text.taiKhoan}`)
              }
            />
            <CloseOutlined
              className="remove-icon"
              onClick={handleConfirmRemove}
            />
          </>
        );
      },
    },
  ];
  const [searchUserState, setSearchUserState] = useState([]);

  const UserSearch = ({ onSearch }) => {
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
      <UserSearch onSearch={handleSearchUser} />
      <p />

      <Table columns={columns} dataSource={data} bordered />
    </>
  );
}
