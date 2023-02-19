import React from "react";
import { useResponsive } from "../../hooks/useResposive";

export default function Footer() {
  const view = useResponsive();
  return (
    <div className={view.width > 1500 ? "container" : "container-fluid"}>
      <div className="footer bg-light py-5 text-center">Designed by Man</div>
    </div>
  );
}
