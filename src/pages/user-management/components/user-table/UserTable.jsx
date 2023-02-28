import { Table, Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { removeUserApi } from "services/user";
import { Pagination } from "enums";

export default function UserTable({
  columns,
  data,
  getUserList,
  setSearchUserState,
  totalUser,
  current,
  setCurrent,
}) {
  const navigate = useNavigate();

  const onChange = (page) => {
    setCurrent(page);
  };

  const handleRemove = async (username) => {
    try {
      await removeUserApi(username);
      notification.success({ message: "Delete user successfully" });
      getUserList();
      setSearchUserState([]);
    } catch ({ response }) {
      notification.error({
        message: response.data.content || "Error deleting!",
      });
    }
  };

  const handleConfirmRemove = (username) => {
    Modal.confirm({
      title: "Do you want to delete this user?",
      onOk: () => handleRemove(username),
    });
  };

  const renderActions = (username) => {
    const actions = [
      <EditOutlined
        key="edit"
        className="update-icon"
        onClick={() => navigate(`/admin/user-management/edit/${username}`)}
      />,
      <CloseOutlined
        key="delete"
        className="remove-icon"
        onClick={() => handleConfirmRemove(username)}
      />,
    ];
    return actions;
  };

  const pagination = {
    currentDefault: Pagination.currentDefault,
    current: current,
    pageSize: Pagination.size,
    onChange: (page) => onChange(page),
    pageSizeOptions: ["10"],
    total: totalUser,
  };

  return (
    <Table
      columns={[
        ...columns,
        {
          title: "Actions",
          render: (record) => renderActions(record.taiKhoan),
        },
      ]}
      dataSource={data}
      bordered
      rowKey="key"
      pagination={pagination}
    />
  );
}
