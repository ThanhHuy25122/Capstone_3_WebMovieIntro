import { Modal, notification } from "antd";
import { LoadingContext } from "contexts/loading/LoadingContext";
import { useState, useEffect, useCallback, useContext } from "react";
import { fetchSearchUserApi } from "services/user";

export function useSearchQuery(keyword) {
  const [searchUserState, setSearchUserState] = useState([]);
  const [totalState, setTotalState] = useState(0);
  const [_, setLoadingState] = useContext(LoadingContext);
  const [searchParams, setSearchParams] = useState({ search: "all", page: 1 });
  const [current, setCurrent] = useState(1);

  const handleSearchQuery = useCallback(async () => {
    setLoadingState({ isLoading: true });
    try {
      const result = await fetchSearchUserApi(keyword, current);
      setSearchParams({
        search: keyword === "" ? "all" : keyword,
        page: current,
      });
      const { totalCount, items, count } = result.data.content;
      if (items.length > 0) {
        setSearchUserState(
          items.map((ele, idx) => {
            return {
              ...ele,
              key: idx,
            };
          })
        );
        setTotalState(totalCount);
      }
      if (count === 0) {
        notification.warning({
          message:
            "Không có tài khoản bạn tìm kiếm " + decodeURIComponent(keyword),
        });
        return;
      }
    } catch ({ response }) {
      Modal.info({
        title: response.data.content || "Lỗi khi lấy dữ liệu",
      });
    } finally {
      setTimeout(() => setLoadingState({ isLoading: false }), 500);
    }
  }, [current, keyword]);

  useEffect(() => {
    handleSearchQuery();
  }, [current, handleSearchQuery]);

  useEffect(() => {
    setCurrent(1);
    handleSearchQuery();
    setSearchParams({
      search: keyword === "" ? "all" : keyword,
      page: 1,
    });
  }, [keyword, handleSearchQuery]);

  return {
    searchUserState,
    totalState,
    searchParams,
    current,
    setCurrent,
  };
}
