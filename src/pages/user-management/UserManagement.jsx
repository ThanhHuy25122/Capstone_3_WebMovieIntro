/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Modal, notification } from "antd";
import { useUserList } from "hooks/useUserList";

import { FormOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserTable from "./components/user-table/UserTable";
import SearchUser from "./components/search/SearhUser";
import { fetchSearchUserApi } from "services/user";
import { LoadingContext } from "contexts/loading/LoadingContext";

export default function UserManagement() {
  const [userList, getUserList] = useUserList();
  const [searchUserState, setSearchUserState] = useState([]);
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams({
    search: "",
    page: 1,
  });
  const [totalUser, setTotalUser] = useState();
  const [current, setCurrent] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [__, setLoadingState] = useContext(LoadingContext);

  useEffect(() => {
    handleSearchQuery();
  }, [current]);

  useEffect(() => {
    setCurrent(1);
    handleSearchQuery();
    setSearchParams({
      search: keyword === "" ? "all" : keyword,
      page: 1,
    });
  }, [keyword]);

  const handleSearchQuery = async () => {
    setLoadingState({ isLoading: true });
    try {
      const result = await fetchSearchUserApi(keyword, current);
      setSearchParams({
        search: keyword === "" ? "all" : keyword,
        page: current,
      });
      const { totalCount, items, count } = result.data.content;
      if (count === 0) {
        setTimeout(() => setLoadingState({ isLoading: false }), 500);
        notification.warning({
          message:
            "Không có tài khoản bạn tìm kiếm " + decodeURIComponent(keyword),
        });
        return;
      }
      if (items.length > 0) {
        setSearchUserState(
          items.map((ele, idx) => {
            return {
              ...ele,
              key: idx,
            };
          })
        );
        setTotalUser(totalCount);
      }
    } catch ({ response }) {
      Modal.info({
        title: response.data.content || "Lỗi khi lấy dữ liệu",
      });
    }
    setTimeout(() => setLoadingState({ isLoading: false }), 500);

    // Chưa làm phần currentPage and ......
  };

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
      dataIndex: "soDt",
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

  const data = searchUserState.length > 0 ? searchUserState : userList;

  return (
    <>
      <p />
      <FormOutlined
        className="add-icon"
        onClick={() => navigate("/admin/user-management/add")}
      />
      <p />
      <SearchUser
        onSearch={handleSearchQuery}
        setCurrent={setCurrent}
        setKeyword={setKeyword}
      />
      <p />
      <UserTable
        columns={columns}
        data={data}
        getUserList={getUserList}
        setSearchUserState={setSearchUserState}
        totalUser={totalUser}
        current={current}
        setCurrent={setCurrent}
      />
    </>
  );
}
