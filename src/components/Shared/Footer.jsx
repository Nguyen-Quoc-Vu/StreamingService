import React from "react";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div className="flex w-full justify-center items-center shadow-xl mt-24 py-6 bg-gray-800 font-bold text-base text-gray-300 px-4 py-2">
      <Link to="/credits">
        © 2022 All rights reserved. Designed by Vu Nguyen | Sponsored by EPAM
        VIETNAM
      </Link>
    </div>
  );
};
