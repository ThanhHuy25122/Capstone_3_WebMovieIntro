import React from "react";

export default function News() {
  return (
    <div className="container">
      <div className="title">
        <h3>TIN KHUYẾN MÃI </h3>
      </div>
      <div
        style={{
          color: "white",
          textAlign: "center",
        }}
        className="row sale-movie"
      >
        <div
          className="card col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6"
          style={{ width: "18rem" }}
        >
          <img
            className="card-img-top"
            src="https://www.cgv.vn/media/wysiwyg/2020/102020/CGV-CRM-TEAM-SURVEY-V7-2020-350x495.jpg"
            alt="Khuyến mãi 1"
          />
          <div className="card-body">
            <p className="card-text">
              <h5>Chào 2023, Đón Mưa Quà Tặng Thành Viên Từ ...</h5>
              Chỉ cần là thành viên{" "}
              <span className="font-weight-bold">Movie Star</span>, nhận ngay 1
              bắp 2 nước!
            </p>
            <button className="detail-card "> CHI TIẾT</button>
          </div>
        </div>
        <div
          className="card col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6"
          style={{ width: "18rem" }}
        >
          <img
            className="card-img-top"
            src="https://stc.shopiness.vn/deal/2020/07/23/b/1/1/4/1595479058933_540.png"
            alt="khuyến mãi 2"
          />
          <div className="card-body">
            <p className="card-text">
              <h5>Ngày Tri Ân Của Movie Star - Ngày Thứ Hai ĐẦ...</h5>
              Từ lâu, chương trình Ngày Tri Ân Nhằm tạo điều kiện thuận lợi hơn
              cho các khách hàng thả ga xem phim đã trở nên quen thuộc với các
              khách hàng thân yêu của .
            </p>
            <button className="detail-card "> CHI TIẾT</button>
          </div>
        </div>
        <div
          className="card col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6"
          style={{ width: "18rem" }}
        >
          <img
            className="card-img-top"
            src="https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/p/o/poster_bttkh_14_1_.jpg"
            alt="khuyến mãi 3"
          />
          <div className="card-body">
            <p className="card-text">
              <h5>U22 Vui Vẻ - Bắp Nước Siêu Hạt Dẻ</h5>
              Cuối 2022, <span className="font-weight-bold">
                Movie Star
              </span>{" "}
              dành tặng các Stars từ 22 tuổi trở xuống một phần quà ưu khủng.
            </p>
            <button className="detail-card "> CHI TIẾT</button>
          </div>
        </div>
        <div
          className="card col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6"
          style={{ width: "18rem" }}
        >
          <img
            className="card-img-top"
            src="https://www.cgv.vn/media/catalog/product/cache/1/image/1800x/71252117777b696995f01934522c402d/p/o/poster_kcnd_1_1_.jpg"
            alt="khuyến mãi 4"
          />
          <div className="card-body">
            <p className="card-text">
              <h5>Happy Day</h5>
              Vào thứ 3 hàng tuần – Happy Day,{" "}
              <span className="font-weight-bold">Movie Star</span> dành tặng giá
              vé ưu đãi CHỈ TỪ 50K!
            </p>
            <button className="detail-card "> CHI TIẾT</button>
          </div>
        </div>
      </div>
    </div>
  );
}
