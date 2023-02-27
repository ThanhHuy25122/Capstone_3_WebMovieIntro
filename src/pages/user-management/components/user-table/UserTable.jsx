import { Table, Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { removeUserApi } from "services/user";

export default function UserTable({ columns, data, getUserList }) {
  const navigate = useNavigate();

  const handleRemove = async (username) => {
    try {
      await removeUserApi(username);
      notification.success({ message: "Delete user successfully" });
      getUserList();
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
      rowKey="taiKhoan"
      pagination={{ pageSize: 10 }}
    />
  );
}
