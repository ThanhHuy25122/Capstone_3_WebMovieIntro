import { Modal } from "antd";
import { LoadingContext } from "contexts/loading/LoadingContext";
import { useContext, useEffect, useState } from "react";
import { fetchUserListApi } from "services/user";

export const useUserList = () => {
  const [userList, setUserList] = useState([]);
  const [_, setLoadingState] = useContext(LoadingContext);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    setLoadingState({ isLoading: true });

    try {
      const result = await fetchUserListApi();
      setUserList(
        result.data.content.map((user, idx) => {
          return { ...user, key: idx };
        })
      );
    } catch ({ response }) {
      Modal.error({
        title:
          response.data.content || "Xảy ra lỗi khi lấy dữ liệu từ database",
      });
    }

    setTimeout(() => {
      setLoadingState({ isLoading: false });
    }, 900);
  };

  return [userList, getUserList];
};
