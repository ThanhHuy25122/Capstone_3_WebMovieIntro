import { Button, Form, Input, notification, Radio, Switch } from "antd";
import { GROUP_ID } from "../../constants";
import { useEffect, useState } from "react";
import { createUserApi } from "services/user";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserAccountApi } from "services/register";

export default function UserForm() {
  const [componentSize, setComponentSize] = useState("default");
  const navigate = useNavigate();
  const [userState, setUserState] = useState({
    maNhom: GROUP_ID,
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
    maLoaiNguoiDung: "KhachHang",
  });
  const params = useParams();

  useEffect(() => {
    getUserAccoutData();
  }, [params.userId]);

  const getUserAccoutData = async () => {
    const result = await fetchUserAccountApi();
    const { hoTen, taiKhoan, matKhau, soDT, maLoaiNguoiDung, email } =
      result?.data?.content;
    setUserState({
      ...userState,
      hoTen,
      taiKhoan,
      matKhau,
      soDt: soDT,
      maLoaiNguoiDung,
      email,
    });
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleFinish = async ({
    hoTen,
    taiKhoan,
    matKhau,
    email,
    soDt,
    maLoaiNguoiDung,
  }) => {
    maLoaiNguoiDung = maLoaiNguoiDung ? "QuanTri" : "KhachHang";

    setUserState({
      ...userState,
      hoTen,
      taiKhoan,
      matKhau,
      email,
      soDt,
      maLoaiNguoiDung,
    });

    try {
      createUserApi(userState);
      notification.success({
        message: "Thêm tài khoản thành công !",
      });
      navigate("/admin/user-management");
    } catch ({ response }) {
      notification.error({
        message: response.data.content || "Không thể thêm được tài khoản !",
      });
    }
  };

  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
        hoTen: userState.hoTen,
        taiKhoan: userState.taiKhoan,
        matKhau: userState.matKhau,
        email: userState.email,
        soDt: userState.soDt,
        maLoaiNguoiDung: userState.maLoaiNguoiDung === "QuanTri" ? true : false,
      }}
      onValuesChange={onFormLayoutChange}
      onFinish={handleFinish}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      {userState.taiKhoan}
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="hoTen" label="Họ và tên">
        <Input />
      </Form.Item>
      <Form.Item name="taiKhoan" label="Tài Khoản">
        <Input />
      </Form.Item>
      <Form.Item name="matKhau" label="Mật Khẩu">
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
      <Form.Item name="soDt" label="Số điện thoại">
        <Input />
      </Form.Item>
      <Form.Item
        name="maLoaiNguoiDung"
        label="Quản Trị"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item label=":">
        <Button htmlType="submit" className="btn-primary">
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
}
