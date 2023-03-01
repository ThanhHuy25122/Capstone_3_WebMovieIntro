import React from "react";
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

  console.log(userState);

  return (
    <div className="container">
      <nav
        className="navbar navbar-expand-sm navbar-light header-bg "
        style={{
          boxShadow: `0px 0px 120px 14px rgba(255,255,255,0.79)`,
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
                      className="btn btn-outline-info my-2 my-sm-0 mr-2"
                      onClick={() => navigate("/admin")}
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
                  className="btn btn-outline-info my-2 my-sm-0 mr-2"
                  type="summit"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
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
