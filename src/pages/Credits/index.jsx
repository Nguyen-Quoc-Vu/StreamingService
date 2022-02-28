import React, { useEffect } from "react";
import Image from "../../assets/credits.jpg";
import QR from "../../assets/qr.png";
const Credits = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex gap-4 items-center justify-center">
      <div className="flex flex-col items-center gap-2 border-r-2 border-gray-600 pr-4">
        <img
          className="p-1 h-48 rounded-full object-cover border-4 border-gray-500"
          src={Image}
          alt=""
        />
        <div className="font-bold text-3xl pb-4">Vu Nguyen</div>
        <div className="border-2 border-gray-700 p-4 rounded-md">
          <div>
            <span className="font-semibold text-lg">Product owner: </span> me
          </div>
          <div>
            <span className="font-semibold text-lg">Project manager: </span> me
          </div>
          <div>
            <span className="font-semibold text-lg">Frontend dev: </span> me
          </div>
          <div>
            <span className="font-semibold text-lg">Sponsors: </span> EPAM
            Vietnam, Firebase, TailwindCSS
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img className="p-1 h-36 object-cover " src={QR} alt="" />
        <div className="font-bold text-1xl pb-6 animate-pulse">
          Buy me a coffee
        </div>
      </div>
    </div>
  );
};

export default Credits;
