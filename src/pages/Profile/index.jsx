import { map } from "@firebase/util";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NoImg from "../../assets/no-img.png";
import FriendCard from "../../components/Profile/FriendCard";

export const Profile = () => {
  const userData = useSelector((state) => state.userData);

  const Avatar = () => (
    <div className="w-28 h-28 flex m-3text-white">
      <img
        className="p-1 rounded-full object-cover border-4"
        src={userData.photoURL ? userData.photoURL : NoImg}
        alt=""
      />
    </div>
  );
  const Info = () => (
    <div className="title font-bold text-center">
      <div className="name break-words">{userData.name}</div>
      <div className="add font-semibold text-sm italic dark">
        {userData.email}
      </div>
    </div>
  );

  const FriendTab = ({ userData }) => (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-xl">Friends</div>
      <div className="grid grid-cols-2">
        {userData?.friends?.map((friendID, index) => (
          <FriendCard key={index} friendID={friendID} />
        ))}
      </div>
    </div>
  );

  return userData ? (
    <div className="grid grid-cols-1 gap-12 p-12 bg-gray-800 w-full rounded-lg">
      <div className="relative flex flex-col gap-4 items-center bg-gray-700 p-12 rounded-md">
        <Avatar />
        <Info />
      </div>
      <div className="relative flex flex-col">
        <FriendTab userData={userData} />
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};
