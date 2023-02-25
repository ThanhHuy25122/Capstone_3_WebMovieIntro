/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  DatePicker,
  Form,
  Image,
  InputNumber,
  Modal,
  notification,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCinemasApi } from "services/cinema";
import { fetchCinemaLocationsApi } from "services/cinema";
import { fetchMovieDetailApi } from "services/movie";
import { addMovieShowtimeApi } from "services/showtime";
import { getCinemaListAction } from "store/actions/cinemaAction";

export default function ShowtimeManagement() {
  const { Option } = Select;
  const dispatch = useDispatch();
  const cinemaList = useSelector((state) => state.cinemaReducer.cinemaList);
  const [cinemaLocationList, setCinemaLocationList] = useState([]);
  const params = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    getMovieDetail();
    fetchCinemaList();
  }, []);

  const getMovieDetail = async () => {
    const result = await fetchMovieDetailApi(params.movieId);
    setMovieDetail(result.data.content);
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
  const fetchCinemaList = async () => {
    try {
      const { data } = await fetchCinemasApi();
      dispatch(getCinemaListAction(data.content));
      fetchCinemaLocationList(data.content[0].maHeThongRap);
    } catch ({ response }) {
      notification.error({
        message: response?.data?.content || "Something went wrong",
      });
    }
  };

  const fetchCinemaLocationList = async (cinema) => {
    try {
      const { data } = await fetchCinemaLocationsApi(cinema);
      setCinemaLocationList(data.content);
    } catch ({ response }) {
      notification.error({
        message: response?.data?.content || "Tài khoản đã tồn tại",
      });
    }
  };

  const handleChange = async (value) => {
    await fetchCinemaLocationList(value);
  };

  const renderCinemaList = () =>
    cinemaList.map(({ maHeThongRap, tenHeThongRap }, idx) => (
      <Option key={idx} value={maHeThongRap}>
        {tenHeThongRap}
      </Option>
    ));

  const renderCinemaLocationList = () => (
    <Select placeholder="" value="">
      {cinemaLocationList.map(({ maCumRap, tenCumRap }, idx) => (
        <Option key={idx} value={maCumRap}>
          {tenCumRap}
        </Option>
      ))}
    </Select>
  );

  const handleFinish = async (values) => {
    const { giaVe, maCumRapChieu, ngayChieuGioChieu } = values;

    let ngayChieu = moment(new Date()).format("DD/MM/YYYY hh:mm:ss");
    if (ngayChieuGioChieu) {
      ngayChieu = ngayChieuGioChieu.format("DD/MM/YYYY hh:mm:ss");
    }

    const data = {
      maPhim: params.movieId,
      maRap: maCumRapChieu,
      ngayChieuGioChieu: ngayChieu,
      giaVe,
    };
    try {
      await addMovieShowtimeApi(data);
      notification.success({
        message: "Successfully created movie showtime !",
      });
      navigate("/admin/movie-management");
    } catch ({ response }) {
      notification.error({
        message: response?.data?.content || "Error",
      });
    }
  };

  const handleConfirmCreate = (data) => {
    Modal.confirm({
      title: "Do you want to create a showtime for this movie?",
      okText: "Create",
      cancelText: "Cancel",
      onOk: () => {
        handleFinish(data);
      },
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          maxWidth: "25%",
        }}
      >
        <Image src={movieDetail.hinhAnh} />
      </div>
      <Form
        {...formItemLayout}
        form={form}
        initialValues={{
          giaVe: 90000,
          tenRap: "BHDStar",
          maCumRapChieu: "bhd-star-cineplex-3-2",
          ngayChieuGioChieu: "",
        }}
        onFinish={handleConfirmCreate}
        style={{
          marginLeft: "5rem",
          minWidth: "600px",
          maxWidth: "60%",
        }}
        scrollToFirstError
      >
        <Form.Item name="tenRap" label="Cinema Name" hasFeedback>
          <Select placeholder="Please select a country" onChange={handleChange}>
            {renderCinemaList()}
          </Select>
        </Form.Item>
        <Form.Item name="maCumRapChieu" label="Cinema Complex" hasFeedback>
          {renderCinemaLocationList()}
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu" name="ngayChieuGioChieu">
          <DatePicker showTime />
        </Form.Item>

        <Form.Item name="giaVe" label="Ticket Price">
          <InputNumber min={80000} max={200000} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button htmlType="submit">Register</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
