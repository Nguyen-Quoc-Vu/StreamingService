import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "../../assets/credits.jpg";
import LikeIcon from "../../assets/icons/LikeIcon";
import QR from "../../assets/qr.png";
import { setPage } from "../../redux/actions/page";
const Credits = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage(null));
  }, [dispatch]);

  return (
    <div className="flex items-center flex-col gap-4">
      <img
        className="p-1 h-48 rounded-full object-cover border-4 border-gray-200"
        src={Image}
        alt=""
      />
      <div className="font-bold text-3xl pb-4">Vu Nguyen</div>
      <div className="flex gap-4 items-center justify-center">
        <div className="flex flex-col items-center gap-2 border-r-2 border-gray-600 pr-4">
          <div className="border-2 border-gray-700 p-4 rounded-md">
            <div className="font-bold text-center text-2xl pb-4">Credits</div>
            <div>
              <span className="font-semibold text-lg">API: </span>
              TVMaze
            </div>
            <div>
              <span className="font-semibold text-lg">Auth/Backend: </span>
              Firebase
            </div>
            <div>
              <span className="font-semibold text-lg">Code reviewer: </span>
              Duc Tran
            </div>
            <div>
              <span className="font-semibold text-lg">Product owner: </span> me
            </div>
            <div>
              <span className="font-semibold text-lg">Scrum master: </span> me
            </div>
            <div>
              <span className="font-semibold text-lg">Project manager: </span>{" "}
              me
            </div>
            <div>
              <span className="font-semibold text-lg">
                Frontend developer:{" "}
              </span>
              me
            </div>
            <div>
              <span className="font-semibold text-lg">Sponsor: </span> EPAM
              Vietnam
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img
            className="p-1 h-36 object-cover rounded-lg mb-4"
            src={QR}
            alt=""
          />
          <div className="font-bold text-1xl pb-6 animate-pulse">
            Scan this QR code to donate for my website! Thank you
          </div>
          <div className="font-bold flex gap-1 items-center">
            Please give me a <LikeIcon />
            and subscribe for my website
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;
