import React from "react";

export default function () {
  return (
    <>
      <div className="mt-2">
        <button
          type="button"
          className="btn btn-light"
          data-toggle="modal"
          data-target="#exampleModall"
        >
          Lưu ý
        </button>
        <div
          className="modal fade"
          id="exampleModall"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Lưu ý chọn ghế
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
              <div style={{ textAlign: "left" }} className="modal-body">
                <h5>Màn hình nằm gần hàng 1 nhất</h5>
                <p>Hàng 1: Ghế từ 1 đến 16</p>
                <p>Hàng 2: Ghế từ 17 đến 32</p>
                <p>Hàng 3: Ghế từ 33 đến 48</p>
                <p>Hàng 4: Ghế từ 49 đến 64</p>
                <p>Hàng 5: Ghế từ 65 đến 80</p>
                <p>Hàng 6: Ghế từ 81 đến 96</p>
                <p>Hàng 7: Ghế từ 97 đến 112</p>
                <p>Hàng 8: Ghế từ 113 đến 128</p>
                <p>Hàng 9: Ghế từ 129 đến 144</p>
                <p>Hàng 10: Ghế từ 145 đến 160</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
