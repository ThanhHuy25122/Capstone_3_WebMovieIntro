/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bookTicketApi, fetchTicketDetailApi } from "../../services/ticket";
import Seat from "./components/seat/Seat";
import * as _ from "lodash";
import "./style.scss";
import Modal from "./modal";
export default function Booking() {
  const [ticketDetail, setTicketDetail] = useState({});
  const [selectedSeatList, setSelectedSeatList] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const screen = {
    borderTop: "1px solid white",
    boxShadow:
      "rgba(240, 234, 170, 0.4) 0px 5px, rgba(240, 234, 170, 0.3) 0px 10px, rgba(240, 234, 170, 0.2) 0px 15px, rgba(240, 234, 170, 0.1) 0px 20px, rgba(240, 234, 170, 0.05) 0px 25px",
  };

  useEffect(() => {
    getTicketDetail();
  }, []);

  const getTicketDetail = async () => {
    const result = await fetchTicketDetailApi(params.showtimeId);

    setTicketDetail(result.data.content);
  };

  const renderSeats = () => {
    return ticketDetail?.danhSachGhe?.map((ele, idx) => {
      return (
        <React.Fragment key={ele.maGhe}>
          <Seat ele={ele} handleSelect={handleSelect} />
          {(idx + 1) % 16 === 0 && <br />}
        </React.Fragment>
      );
    });
  };

  const handleSelect = (seat) => {
    const data = [...selectedSeatList];
    const idx = data.findIndex((ele) => ele.maGhe === seat.maGhe);

    if (idx !== -1) {
      data.splice(idx, 1);
    } else {
      data.push(seat);
    }
    setSelectedSeatList(data);
  };

  useEffect(() => {}, [selectedSeatList]);

  const bookTicket = async () => {
    const data = {
      maLichChieu: params.showtimeId,
      danhSachVe: selectedSeatList.map((ele) => {
        return {
          maGhe: ele.maGhe,
          giaVe: ele.giaVe,
        };
      }),
    };
    await bookTicketApi(data);
    alert("Đặt vé thành công");
    navigate("/");
  };

  return (
    <div
      className="py-5 container booking-css"
      style={{
        minHeight: "calc( 100vh - 160px )",
      }}
    >
      <div className="row ">
        <div className="col-12 col-xl-8 mb-5" style={screen}></div>
        <div className=" col-12 col-xl-8 chair">
          {renderSeats()}
          <div style={{ width: "95%" }} className="mx-auto"></div>

          <Modal />

          <div className="w-100 mt-4 mx-auto">
            <div
              style={{
                width: "95%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="mx-auto"
            >
              <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-secondary">
                Ghế đã đặt
              </div>
              <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-dark">
                Ghế chưa đặt
              </div>
              <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-primary">
                Ghế đang đặt
              </div>
              <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-warning">
                Ghế VIP
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4 ">
          <div className="booking-detail">
            <img
              style={{ width: 300, height: 400, objectFit: "cover" }}
              src={ticketDetail?.thongTinPhim?.hinhAnh}
              alt="#"
            />
            <h4 className="mb-0">{ticketDetail?.thongTinPhim?.tenPhim}</h4>
            <h5 className="mb-0">
              Number of seats:
              <div>
                {selectedSeatList?.map((ele) => {
                  return (
                    <p
                      key={ele.maGhe}
                      className="badge badge-success mr-2 mb-0"
                    >
                      {ele.tenGhe}
                    </p>
                  );
                })}
              </div>
            </h5>
            <h5>
              Total: {_.sumBy(selectedSeatList, "giaVe").toLocaleString()} VND
            </h5>

            <button onClick={bookTicket} className="btn btn-warning">
              MUA VÉ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
