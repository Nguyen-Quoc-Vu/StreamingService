import React from "react";
import { useNavigate } from "react-router-dom";
import NoImg from "../../assets/no-img.png";

const UserCard = ({ thumbnail, name, id }) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/profile/${id}`);
  };
  return (
    <div
      onClick={handleOnClick}
      className="flex flex-col gap-2 items-center hover:bg-gray-700 rounded-md cursor-pointer duration-150 p-2"
    >
      <img
        className="w-24 h-24 object-cover rounded-full"
        alt="friend avatar"
        src={thumbnail ? thumbnail : NoImg}
      />
      <div className="font-bold">{name}</div>
    </div>
  );
};

export default UserCard;
