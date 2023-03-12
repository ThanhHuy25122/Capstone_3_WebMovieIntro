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
        <div className="card col-xl" style={{ width: "18rem" }}>
          <img
            className="card-img-top"
            src="https://www.cgv.vn/media/wysiwyg/2020/102020/CGV-CRM-TEAM-SURVEY-V7-2020-350x495.jpg"
            alt="Khuyến mãi 1"
          />
          <div className="card-body">
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="card col-xl" style={{ width: "18rem" }}>
          <img
            className="card-img-top"
            src="https://stc.shopiness.vn/deal/2020/07/23/b/1/1/4/1595479058933_540.png"
            alt="khuyến mãi 2"
          />
          <div className="card-body">
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="card col-xl" style={{ width: "18rem" }}>
          <img
            className="card-img-top"
            src="https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/p/o/poster_bttkh_14_1_.jpg"
            alt="khuyến mãi 3"
          />
          <div className="card-body">
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="card col-xl" style={{ width: "18rem" }}>
          <img
            className="card-img-top"
            src="https://www.cgv.vn/media/catalog/product/cache/1/image/1800x/71252117777b696995f01934522c402d/p/o/poster_kcnd_1_1_.jpg"
            alt="khuyến mãi 4"
          />
          <div className="card-body">
            <p className="card-text">cccccccccccccc</p>
          </div>
        </div>
      </div>
    </div>
  );
}
