import React from "react";

const HeartIcon = ({ fill }) => {
  return (
    <svg
      className={`h-7 w-7 text-red-500 hover:animate-pulse duration-500`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path
        fill={fill ? "rgb(239 68 68)" : "none"}
        d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7"
      />
    </svg>
  );
};

export default HeartIcon;
