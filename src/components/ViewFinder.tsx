import React from "react";

export interface IViewFinder {}

const ViewFinder: React.FC<IViewFinder> = () => {
  return (
    <svg
      width="50px"
      viewBox="0 0 100 100"
      style={{ border: "70px solid rgba(0, 0, 0, 0.5)" }}
      className="top-0 left-0 z-10 box-border absolute w-full h-full"
    >
      <path
        fill="none"
        d="M13,0 L0,0 L0,13"
        stroke="rgba(255, 0, 0, 0.7)"
        strokeWidth="5"
      ></path>
      <path
        fill="none"
        d="M0,87 L0,100 L13,100"
        stroke="rgba(255, 0, 0, 0.7)"
        strokeWidth="5"
      ></path>
      <path
        fill="none"
        d="M87,100 L100,100 L100,87"
        stroke="rgba(255, 0, 0, 0.7)"
        strokeWidth="5"
      ></path>
      <path
        fill="none"
        d="M100,13 L100,0 87,0"
        stroke="rgba(255, 0, 0, 0.7)"
        strokeWidth="5"
      ></path>
    </svg>
  );
};

ViewFinder.defaultProps = {};

export default ViewFinder;
