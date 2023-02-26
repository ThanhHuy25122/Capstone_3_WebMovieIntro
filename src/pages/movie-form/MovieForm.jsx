import React from "react";
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  notification,
  Radio,
  Select,
  Switch,
} from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import moment from "moment";
import { GROUP_ID } from "../../constants";
import { addMovieApi, editMovieApi, fetchMovieDetailApi } from "services/movie";

export default function MovieForm() {
  const [form] = useForm();
  const params = useParams();
  const [file, setFile] = useState();
  const [imageReview, setImageReview] = useState();
  /* eslint-disable react-hooks/exhaustive-deps */
  const [componentSize, setComponentSize] = useState("default");
  const navigate = useNavigate();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  useEffect(() => {
    if (params.movieId) {
      getMovieDetail();
    }
  }, [params.movieId]);

  const getMovieDetail = async () => {
    const result = await fetchMovieDetailApi(params.movieId);

    const {
      tenPhim,
      moTa,
      trailer,
      maNhom,
      ngayKhoiChieu,
      sapChieu,
      dangChieu,
      hot,
      danhGia,
      hinhAnh,
    } = result.data.content;

    form.setFieldsValue({
      tenPhim: tenPhim,
      moTa: moTa,
      trailer: trailer,
      maNhom: maNhom,
      ngayKhoiChieu: moment(ngayKhoiChieu),
      sapChieu: sapChieu,
      dangChieu: dangChieu,
      hot: hot,
      danhGia: danhGia,
    });
    setImageReview(hinhAnh);
  };

  const handleFinish = async (values) => {
    values.ngayKhoiChieu = values.ngayKhoiChieu.format("DD/MM/YYYY");
    const formData = new FormData();
    formData.append("tenPhim", values.tenPhim);
    formData.append("moTa", values.moTa);
    formData.append("trailer", values.trailer);
    formData.append("maNhom", GROUP_ID);
    formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
    formData.append("sapChieu", values.sapChieu);
    formData.append("dangChieu", values.dangChieu);
    formData.append("hot", values.hot);
    formData.append("danhGia", values.danhGia);
    file && formData.append("File", file, file.name);

    if (params.movieId) {
      formData.append("maPhim", params.movieId);
      await editMovieApi(formData);
    } else {
      await addMovieApi(formData);
    }

    notification.success({
      message: params.id ? "Sửa phim thành công" : "Thêm phim thành công",
    });

    navigate("/admin/movie-management/");
  };

  const handleFile = (event) => {
    setFile(event.target.files[0]);

    // chuyển ảnh -> base64
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // ĐỌC FILE

    //callback dc goi lai sau khi doc file
    reader.onload = (event) => {
      setImageReview(event.target.result); //
    };
  };
  return (
    <Form
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
        tenPhim: "",
        trailer: "",
        moTa: "",
        maNhom: "",
        ngayKhoiChieu: "",
        sapChieu: true,
        dangChieu: true,
        hot: true,
        danhGia: 5,
      }}
      onFinish={handleFinish}
      onValuesChange={onFormLayoutChange}
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
        label="Tên Phim"
        name="tenPhim"
        rules={[
          {
            required: true,
            message: "Tên phim không được bỏ trống",
          },
          {
            min: 6,
            message: "Tên phim phải lớn hơn 5 ký tự",
          },
          {
            max: 20,
            message: "Tên phim phải nhỏ hơn hoặc bằng 20 ký tự",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Trailer" name="trailer">
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Mô ta" name="moTa">
        <Input />
      </Form.Item>

      <Form.Item label="Ngày khởi chiếu" name="ngayKhoiChieu">
        <DatePicker showTime />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked" name="dangChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Săp Chiếu" valuePropName="checked" name="sapChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked" name="hot">
        <Switch />
      </Form.Item>
      <Form.Item label="Số sao" name="danhGia">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <Input type="file" onChange={handleFile} />
      </Form.Item>
      <Image src={imageReview} />
      <p />
      <Form.Item label="Button">
        <Button htmlType="submit">Lưu</Button>
      </Form.Item>
    </Form>
  );
}
