import React from "react";
import { Bars } from "react-loader-spinner";
function Loader() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Loader;
