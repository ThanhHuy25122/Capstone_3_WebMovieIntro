import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setUserInfoAction } from "../../store/actions/userAction";
import { MaLoaiNguoiDung } from "enums";

export default function Header() {
  const userState = useSelector((state) => state.userReducer);
  const { userInfo } = userState;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("USER_INFO_KEY");
    dispatch(setUserInfoAction(null));
    navigate("/");
  };

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 20) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  return (
    <div
      className="container"
      style={{
        position: isFixed ? "fixed" : "static",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 1000,
      }}
    >
      <nav
        className="navbar navbar-expand-sm navbar-light header-bg "
        style={{
          boxShadow: "rgb(255 255 255 / 48%) 0px 0px 120px 4px",
          background: isFixed ? "rgb(40, 167, 69)" : "rgba(40, 167, 69,.5)",
        }}
      >
        <NavLink
          style={{ fontSize: "30px" }}
          className="navbar-brand text-light"
          to={"/"}
        >
          <i style={{ fontSize: "2rem" }} className="las la-star-half-alt"></i>
          MOVIE STAR
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
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
          <div className="ml-auto">
            {userInfo ? (
              <>
                {userInfo.maLoaiNguoiDung !== MaLoaiNguoiDung.QuanTri ? (
                  <>
                    <span className="mr-3">
                      Hi,{" "}
                      {
                        <NavLink to={`/update-user/${userInfo?.taiKhoan}`}>
                          {userInfo?.hoTen}
                        </NavLink>
                      }
                    </span>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-outline-light my-2 my-sm-0 mr-2"
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
  );
}
