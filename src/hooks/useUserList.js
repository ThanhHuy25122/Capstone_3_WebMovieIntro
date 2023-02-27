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
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => {
      setLoadingState({ isLoading: false });
    }, 900);
  };

  return [userList, getUserList];
};
