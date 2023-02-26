import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, notification } from "antd";
import {
  addUserApi,
  fetchUserAccountApi,
  updateUserApi,
} from "services/register";
import { GROUP_ID } from "../../constants/index.js";
import { useNavigate, useParams } from "react-router";
import BookedTickets from "./components/booked-tickets/BookedTickets.jsx";
import { MaLoaiNguoiDung } from "enums/index.js";
import { useForm } from "antd/es/form/Form.js";

export default function Register() {
  const [state, setState] = useState({
    maNhom: GROUP_ID,
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
  });

  const [userType, setUserType] = useState(null);
  const [bookingInformation, setBookingInformation] = useState(null);

  const navigate = useNavigate();

  console.log({ userType, bookingInformation });

  const params = useParams();

  useEffect(() => {
    if (params.userId) {
      getUpdateUser();
    }
  }, [params.userId]);

  const getUpdateUser = async () => {
    try {
      const result = await fetchUserAccountApi();
      const {
        hoTen,
        taiKhoan,
        matKhau,
        email,
        soDT,
        loaiNguoiDung,
        thongTinDatVe,
      } = result.data.content;

      form.setFieldsValue({
        hoTen: hoTen,
        taiKhoan: taiKhoan,
        matKhau: matKhau,
        email: email,
        soDt: soDT,
      });
      setState({
        ...state,
        hoTen: hoTen,
        taiKhoan: taiKhoan,
        matKhau: matKhau,
        email: email,
        soDt: soDT,
      });

      setUserType(loaiNguoiDung);
      setBookingInformation(thongTinDatVe.lenght || null);
    } catch ({ response }) {
      notification.error({
        message: response?.data?.content || "Xin lỗi đã xảy ra lổi !",
      });
      navigate("/");
    }
  };

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

  const [form] = useForm();
  const handleFinish = async (values) => {
    setState({
      taiKhoan: values.taiKhoan,
      matKhau: values.matKhau,
      email: values.email,
      soDt: values.soDt,
      hoTen: values.hoTen,
    });
    const data = {
      ...values,
      maLoaiNguoiDung: MaLoaiNguoiDung.KhachHang,
      maNhom: GROUP_ID,
      loaiNguoiDung: userType,
      thongTinDatVe: bookingInformation,
    };

    console.log(data);

    try {
      if (params.userId) {
        await updateUserApi(data);
        notification.success({
          message: "Cập nhật tài khoản thành công !",
        });
      } else {
        try {
          await addUserApi(state);
          notification.success({
            message: "Đăng ký tài khoản thành công",
          });
          setTimeout(() => navigate("/login"), 1000);
        } catch ({ response }) {
          Modal.error({
            title: response?.data.content || " Lỗi không đăng ký được ",
          });
        }
      }
    } catch ({ response }) {
      notification.error({
        message: response?.data?.content || " Không thể cập nhật tài khoản",
      });
    }
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
        backgroundColor: "white",
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
        initialValues={{
          hoTen: "",
          taiKhoan: "",
          matKhau: "",
          eamil: "",
          soDt: "",
        }}
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
          {params.userId ? (
            <Button htmlType="submit">Update</Button>
          ) : (
            <Button htmlType="submit">Register</Button>
          )}
        </Form.Item>
      </Form>
      {params.userId && <BookedTickets />}
    </div>
  );
}
