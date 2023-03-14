/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, notification, Radio, Switch } from "antd";
import { GROUP_ID } from "../../constants";
import { useEffect, useState } from "react";
import { createUserApi, fetchUserApi } from "services/user";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { updateUserApi } from "services/register";

export default function UserForm() {
  const [form] = useForm();

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
    if (params.userId) {
      getUserAccountData();
    }
  }, [params.userId]);

  const getUserAccountData = async () => {
    const result = await fetchUserApi(params.userId);
    const { hoTen, taiKhoan, matKhau, soDT, maLoaiNguoiDung, email } =
      result?.data?.content;

    form.setFieldsValue({
      hoTen: hoTen,
      taiKhoan: taiKhoan,
      matKhau: matKhau,
      email: email,
      soDt: soDT,
      maLoaiNguoiDung: maLoaiNguoiDung === "QuanTri" ? true : false,
    });

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
      if (params.userId) {
        updateUserApi(userState);
        notification.success({
          message: "Cập nhật tài khoản thành công !",
        });
        navigate("/admin/user-management");
      } else {
        createUserApi(userState);
        notification.success({
          message: "Thêm tài khoản thành công !",
        });
        navigate("/admin/user-management");
      }
    } catch ({ response }) {
      notification.error({
        message: response.data.content || "Không thể thêm được tài khoản !",
      });
    }
  };

  function handleKeyPress(event) {
    if (event.key === " ") {
      event.preventDefault();
    }
  }

  return (
    <Form
      form={form}
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
        hoTen: "",
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maLoaiNguoiDung: false,
      }}
      onValuesChange={onFormLayoutChange}
      onFinish={handleFinish}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="hoTen"
        label="Họ và tên"
        rules={[{ required: true, message: "Không được để trống !" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        onKeyPress={handleKeyPress}
        name="taiKhoan"
        label="Tài Khoản"
        rules={[{ required: true, message: "Không được để trống !" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        onKeyPress={handleKeyPress}
        name="matKhau"
        label="Mật Khẩu"
        rules={[
          { required: true, message: "Không được để trống !" },
          {
            pattern: new RegExp(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
            ),
            message:
              "Tối thiểu tám ký tự, ít nhất một chữ cái in hoa, một chữ cái thường, một chữ số.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        onKeyPress={handleKeyPress}
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Không được để trống !" },
          {
            pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
            message: " Phải đúng định dạng email abc@exp.com",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        onKeyPress={handleKeyPress}
        name="soDt"
        label="Số điện thoại"
        rules={[
          { required: true, message: "Không được để trống !" },
          {
            pattern: new RegExp(/^0\d{9}$/),
            message: "Phải chứa 10 số và bắt đầu bằng số 0",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="maLoaiNguoiDung"
        label="Quản Trị"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item label="  ">
        <Button htmlType="submit" className="btn-primary">
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
}
