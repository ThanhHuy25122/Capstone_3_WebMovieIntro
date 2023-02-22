import { Spin } from "antd";
import { createContext, useEffect, useState } from "react";
import "./index.scss";

const DEFAULT_STATE = {
  isLoading: false,
};

const LoadingContext = createContext(DEFAULT_STATE);

const LoadingProvider = (props) => {
  const [state, setState] = useState(DEFAULT_STATE);
  useEffect(() => {
    document.querySelector("body").style.overflow = state.isLoading
      ? "hidden"
      : "auto";
  }, [state.isLoading]);

  return (
    <LoadingContext.Provider value={[state, setState]}>
      {state.isLoading && (
        <div className="filter">
          <div className="spin">
            <Spin indicator={null} />
          </div>
        </div>
      )}
      {props.children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
