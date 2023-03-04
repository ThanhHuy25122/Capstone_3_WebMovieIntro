import React from "react";
import { useResponsive } from "../../hooks/useResposive";
import "./style.scss";
export default function Footer() {
  return (
    <div className="container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="container-fluid justify-content-center">
        <hr className="mx-0 px-0 bg-light" />
        <footer>
          <div className="row justify-content-around mb-0  pb-0 ">
            <div className=" col-12">
              <div className="row justify-content-center">
                <div className="col-md-3 col-sm-3 col-6 font-italic align-items-center mt-md-3 mt-4 footer-design">
                  <h5>MOVIE STAR</h5>
                  <p className="social mt-md-3 mt-2">
                    <span>
                      <i className="fa fa-facebook " aria-hidden="true" />
                    </span>
                    <span>
                      <i className="fa fa-linkedin" aria-hidden="true" />
                    </span>
                    <span>
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </span>
                  </p>
                  <small className="copy-rights cursor-pointer footer-design">
                    Ⓒ 2023 Movie Star Technologies
                  </small>
                </div>
                <div className="col-md-3 col-sm-3 col-6  footer-design">
                  <ul className="list-unstyled">
                    <li className="mt-md-3 mt-4">GIỚI THIỆU</li>
                    <li>VỀ CHÚNG TÔI</li>
                    <li>THOẢ THUẬN SỬ DỤNG</li>
                    <li>CƠ CHẾ HOẠT ĐỘNG</li>
                    <li>CHÍNH SÁCH BẢO MẬT</li>
                  </ul>
                </div>
                <div className="col-md-3 col-sm-3 col-6   footer-design">
                  <ul className="list-unstyled">
                    <li className="mt-md-3 mt-4">GÓC ĐIỆN ẢNH</li>
                    <li>THỂ LOẠI PHIM</li>
                    <li>BÌNH LUẬN PHIM</li>
                    <li>BLOG ĐIỆN ẢNH</li>
                    <li>PHIM HAY THÁNG</li>
                  </ul>
                </div>
                <div className="col-xl-auto col-md-3 col-sm-3 col-6   footer-design">
                  <ul className="list-unstyled">
                    <li className="mt-md-3 mt-4">HỖ TRỢ</li>
                    <li>GÓP Ý</li>
                    <li>SALE & SERVICER</li>
                    <li>RẠP / GIÁ VÉ</li>
                    <li>TUYỂN DỤNG</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
