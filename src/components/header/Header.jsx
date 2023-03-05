import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useResponsive } from "../../hooks/useResposive";
import { setUserInfoAction } from "../../store/actions/userAction";
import { MaLoaiNguoiDung } from "enums";
import "./style.scss";
import { useMovieList } from "hooks/useMovieList";
export default function Header() {
  const view = useResponsive();
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movieList] = useMovieList();
  const { userInfo } = userState;
  const [keyword, setKeyword] = useState({ keyword: "" });
  const handleLogout = () => {
    localStorage.removeItem("USER_INFO_KEY");
    dispatch(setUserInfoAction(null));
    navigate("/");
  };
  console.log(userInfo);
  const handleNavigate = (ele) => {
    navigate(`/movie-detail/${ele.maPhim}`);
    document.querySelector("#click-button").click();
    window.location.reload();
  };
  const handleSearch = () => {
    if (keyword.keyword.length < 1) {
      return " Vui lòng nhập tên phim bạn muốn tìm!";
    }
    const filterData = movieList.filter((ele) => {
      return (
        ele.tenPhim.toLowerCase().indexOf(keyword.keyword.toLowerCase()) !== -1
      );
    });

    if (filterData.length === 0) {
      return "Không tìm thấy phim theo yêu cầu!";
    }

    return filterData.map((ele) => {
      return (
        <div key={ele.maPhim} onClick={() => handleNavigate(ele)}>
          <p className="search-list">{ele.tenPhim}</p>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="container bg-1">
        <nav className="navbar navbar-expand-sm bg-light ">
          <NavLink className="  ml-2  navbar-brand " to={"/"}>
            <i className="las la-star-half-alt icon-movie"></i>
            <span className="movie-star">MOVIE STAR</span>
          </NavLink>
          <button
            className="navbar-toggler d-lg-none "
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavIdd"
            aria-controls="collapsibleNavIdd"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="las la-angle-down"></i>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavIdd">
            <div className="ml-auto  content2">
              <span className="">{userState.userInfo?.hoTen}</span>
              {userInfo ? (
                <>
                  {userState.userInfo.maLoaiNguoiDung !==
                  MaLoaiNguoiDung.QuanTri ? (
                    <></>
                  ) : (
                    <>
                      <button
                        className="btn btn-light my-2 my-sm-0 mr-2"
                        onClick={() => navigate("/admin/movie-management")}
                      >
                        Admin
                      </button>
                    </>
                  )}

                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-warning my-2 my-sm-0 mr-2"
                    type="summit"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                  <button
                    className="btn btn-primary my-2 my-sm-0"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>

      <div className="container">
        <nav className="navbar navbar-expand-md navbar-light header-bg ">
          <button
            className="navbar-toggler d-lg-none "
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item  ml-5">
                <NavLink className="home-css" to="/">
                  TRANG CHỦ 2
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm tên phim ,diễn viên..."
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                onChange={(event) => {
                  setKeyword({ keyword: event.target.value });
                }}
              />
              <button
                className="btn btn-outline-primary btn-search"
                type="button"
                id="button-addon2"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <i className="las la-search icon-search" />
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                KẾT QUẢ
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="modal-body">{handleSearch()}</div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                id="click-button"
              >
                ĐÓNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
