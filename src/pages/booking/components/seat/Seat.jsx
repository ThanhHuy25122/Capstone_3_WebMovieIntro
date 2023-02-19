import React, { useState } from "react";
import { LoaiGhe } from "../../../../enums";
import { useResponsive } from "../../../../hooks/useResposive";

export default function Seat(props) {
  const view = useResponsive();
  const [isSelected, setIsSelected] = useState(false);

  const populateClassName = () => {
    if (props.ele.daDat) {
      return "btn-secondary";
    }

    if (isSelected) {
      return "btn-primary";
    }

    if (props.ele.loaiGhe === LoaiGhe.Vip) {
      return "btn-warning";
    }
    return "btn-dark";
  };
  
  const handleSelectSeat = () => {
    setIsSelected(!isSelected);
    props.handleSelect(props.ele);
  };

  return (
    <>
      <button
        onClick={() => handleSelectSeat()}
        disabled={props.ele.daDat}
        style={{ width: 40, height: 40, padding: 0 }}
        className={`mr-1 mb-1 btn ${populateClassName()}`}
      >
        {props.ele.tenGhe}
      </button>
    </>
  );
}
