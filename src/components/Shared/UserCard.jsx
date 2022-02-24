import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoImg from "../../assets/non-avatar.png";

const UserCard = ({ thumbnail, name, id }) => {
  const navigate = useNavigate();
  const [avatar,setAvatar] = useState(thumbnail);
  const handleOnClick = () => {
    navigate(`/profile/${id}`);
  };
  return (
    <div
      onClick={handleOnClick}
      className="flex flex-col gap-2 items-center hover:bg-gray-700 rounded-md cursor-pointer duration-150 p-2"
    >
      <img
        className="w-36 h-36 object-cover rounded-full"
        onError={()=>setAvatar(NoImg)}
        alt="friend avatar"
        src={avatar ? avatar : NoImg}
      />
      <div className="font-bold">{name}</div>
    </div>
  );
};

export default UserCard;
