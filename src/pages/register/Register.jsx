import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { addUserApi } from "services/register";
import { GROUP_ID } from "../../constants/index.js";
import { useNavigate } from "react-router";

export default function Register() {
  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: GROUP_ID,
    hoTen: "",
  });

  const navigate = useNavigate();

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const [form] = Form.useForm();
  const handleFinish = async (values) => {
    setState({
      taiKhoan: values.taiKhoan,
      matKhau: values.matKhau,
      email: values.email,
      soDt: values.soDt,
      maNhom: GROUP_ID,
      hoTen: values.hoTen,
    });

    await addUserApi(state);
    navigate("/login");
  };

  // block space

  function handleKeyPress(event) {
    if (event.key === " ") {
      event.preventDefault();
    }
  }

  return (
    <div
      className="pl-3 pr-3"
      style={{
        minHeight: "calc( 100vh - 160px )",
        paddingTop: "50px",
      }}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleFinish}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="hoTen"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
            {
              max: 100,
              message: "Please enter full name 100 characters!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          onKeyPress={handleKeyPress}
          name="taiKhoan"
          label="Username"
          rules={[
            {
              defaultField: `/^S+$/`,
              required: true,
              min: 8,
              max: 12,
              message: "Please input your username!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="matKhau"
          onKeyPress={handleKeyPress}
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          onKeyPress={handleKeyPress}
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="soDt"
          onKeyPress={handleKeyPress}
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
            {
              len: 10,
              massage: "Please input your phone number in VietNam 10 digits! ",
            },
          ]}
        >
          <Input
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
