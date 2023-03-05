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
import { NavLink } from "react-router-dom";

export default function Register() {
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
      thongTinDatVe.lenght > 0 ? setBookingInformation(thongTinDatVe) : <></>;
    } catch ({ response }) {
      notification.error({
        message: response?.data?.content || "Xin lỗi đã xảy ra lỗi !",
      });
      navigate("/");
    }
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

  // block space on input

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
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleFinish}
        style={{
          maxWidth: 800,
          width: 600,
          height: 500,
          padding: "50px",
          backgroundColor: "white",
          borderRadius: 15,
          position: "relative",
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
        <NavLink
          className="btn btn-secondary"
          style={{
            position: "absolute",
            zIndex: "2",
            bottom: "15px",
            left: "15px",
            fontSize: "13px",
          }}
          to="/"
        >
          Trở về trang chủ
        </NavLink>
        <NavLink
          className="btn btn-primary  "
          style={{
            position: "absolute",
            zIndex: "2",
            bottom: "15px",
            right: "15px",
            fontSize: "13px",
          }}
          to="/login"
        >
          Login
        </NavLink>

        <Form.Item
          className="text-light"
          name="hoTen"
          label="Họ & tên"
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
          <Input placeholder="Nhập họ và tên ..." />
        </Form.Item>
        <Form.Item
          className="text-light"
          onKeyPress={handleKeyPress}
          name="taiKhoan"
          label="Tài khoản"
          rules={[
            {
              required: true,
              message: "Không được để trống !",
            },
          ]}
        >
          <Input placeholder="Nhập tài khoản ..." />
        </Form.Item>

        <Form.Item
          className="text-light"
          name="matKhau"
          onKeyPress={handleKeyPress}
          label="Mật khẩu"
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
          hasFeedback
        >
          <Input.Password placeholder="Nhập mật khẩu " />
        </Form.Item>

        <Form.Item
          className="text-light"
          name="email"
          label="E-mail"
          onKeyPress={handleKeyPress}
          rules={[
            { required: true, message: "Không được để trống !" },
            {
              pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
              message: " Phải đúng định dạng email abc@exp.com",
            },
          ]}
        >
          <Input placeholder="Nhập mail ..." />
        </Form.Item>
        <Form.Item
          className="text-light"
          name="soDt"
          onKeyPress={handleKeyPress}
          label="Số điện thoại"
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
            placeholder="Nhập số điện thoại ..."
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item className="text-light" {...tailFormItemLayout}>
          {params.userId ? (
            <Button className=" btn-success" htmlType="submit">
              Update
            </Button>
          ) : (
            <Button className=" btn-warning" htmlType="submit">
              Register
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}
