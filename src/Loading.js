import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <React.Fragment>
      <div className="loading">
        <ReactLoading type="spinningBubbles" color="#ffffff" />
        <h1
          style={{
            fontFamily: "Gill Sans",
            color: "#D4CDE2",
            fontSize: "1.5rem",
          }}
        >
          Loading...
        </h1>
      </div>
    </React.Fragment>
  );
}
