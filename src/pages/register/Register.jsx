import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, notification } from "antd";
import {
  addUserApi,
  fetchUserAccountApi,
  updateUserApi,
} from "services/register";
import { GROUP_ID } from "../../constants/index.js";
import { useNavigate, useParams } from "react-router";
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
        message: response?.data?.content || "Xin l???i ???? x???y ra l???i !",
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
          message: "C???p nh???t t??i kho???n th??nh c??ng !",
        });
      } else {
        try {
          await addUserApi(state);
          notification.success({
            message: "????ng k?? t??i kho???n th??nh c??ng",
          });
          setTimeout(() => navigate("/login"), 1000);
        } catch ({ response }) {
          Modal.error({
            title: response?.data.content || " L???i kh??ng ????ng k?? ???????c ",
          });
        }
      }
    } catch ({ response }) {
      notification.error({
        message: response?.data?.content || " Kh??ng th??? c???p nh???t t??i kho???n",
      });
    }
  };

  // block space on input

  const handleKeyPress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

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
      <header
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        <h1
          className="py-2"
          style={{
            display: params.userId ? "none" : undefined,
          }}
        >
          Sign up
        </h1>

        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={handleFinish}
          style={{
            maxWidth: 600,
            width: "100vw",
            height: "auto",
            padding: "50px",
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
            className="text-danger"
            style={{
              display: params.userId ? "none" : undefined,
              position: "absolute",
              zIndex: "2",
              bottom: "20px",
              left: "20px",
              fontSize: "1.2rem",
              textDecoration: "underline",
            }}
            to="/"
          >
            Trang ch???
          </NavLink>
          <NavLink
            className="text-primary"
            style={{
              display: params.userId ? "none" : undefined,
              position: "absolute",
              zIndex: "2",
              bottom: "20px",
              right: "20px",
              fontSize: "1.2rem",
              textDecoration: "underline",
            }}
            to="/login"
          >
            Login
          </NavLink>

          <Form.Item
            className="text-light"
            name="hoTen"
            label="H??? & t??n"
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
            <Input placeholder="Nh???p h??? v?? t??n ..." />
          </Form.Item>
          <Form.Item
            className="text-light"
            onKeyPress={handleKeyPress}
            name="taiKhoan"
            label="T??i kho???n"
            rules={[
              {
                required: true,
                message: "Kh??ng ???????c ????? tr???ng !",
              },
            ]}
          >
            <Input placeholder="Nh???p t??i kho???n ..." />
          </Form.Item>

          <Form.Item
            className="text-light"
            name="matKhau"
            onKeyPress={handleKeyPress}
            label="M???t kh???u"
            rules={[
              { required: true, message: "Kh??ng ???????c ????? tr???ng !" },
              {
                pattern: new RegExp(
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
                ),
                message:
                  "T???i thi???u t??m k?? t???, ??t nh???t m???t ch??? c??i in hoa, m???t ch??? c??i th?????ng, m???t ch??? s???.",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Nh???p m???t kh???u " />
          </Form.Item>

          <Form.Item
            className="text-light"
            name="email"
            label="E-mail"
            onKeyPress={handleKeyPress}
            rules={[
              { required: true, message: "Kh??ng ???????c ????? tr???ng !" },
              {
                pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
                message: " Ph???i ????ng ?????nh d???ng email abc@exp.com",
              },
            ]}
          >
            <Input placeholder="Nh???p mail ..." />
          </Form.Item>
          <Form.Item
            className="text-light"
            name="soDt"
            onKeyPress={handleKeyPress}
            label="S??? ??i???n tho???i"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                len: 10,
                massage:
                  "Please input your phone number in VietNam 10 digits! ",
              },
            ]}
          >
            <Input
              placeholder="Nh???p s??? ??i???n tho???i ..."
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item className="text-light" {...tailFormItemLayout}>
            {params.userId ? (
              <Button type="primary" htmlType="submit" size="large">
                Ch???nh s???a
              </Button>
            ) : (
              <Button type="primary" htmlType="submit" size="large">
                ????ng k??
              </Button>
            )}
          </Form.Item>
        </Form>
      </header>
    </div>
  );
}
