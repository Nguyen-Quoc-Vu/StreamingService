import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NoImg from "../../assets/no-img.png";
import CardList from "../../components/CardList";
import FriendCard from "../../components/Profile/FriendCard";

export const Profile = () => {
  const userData = useSelector((state) => state.userData);

  const Avatar = () => (
    <div className="w-32 h-32 flex m-3text-white">
      <img
        className="p-1 rounded-full object-cover border-4"
        src={userData.photoURL ? userData.photoURL : NoImg}
        alt=""
      />
    </div>
  );
  const Info = () => (
    <div className="title font-bold text-center">
      <div className="text-2xl break-words">{userData.name}</div>
      <div className="add font-semibold text-base italic dark">
        {userData.email}
      </div>
    </div>
  );

  const FriendTab = ({ userData }) => (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-2xl">Friends ({userData.friends.length})</div>
      <div className="grid grid-cols-5">
        {userData?.friends?.map((friendID, index) => {
          return <FriendCard key={index} friendID={friendID} />;
        })}
      </div>
    </div>
  );

  const FavoriteTab = ({ userData }) => (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-2xl">Favorite list ({userData.myList.length})</div>
      <CardList
        description=""
        data={userData.myList}
        limit={100}
        type="myList"
      />
    </div>
  );

  return userData ? (
    <div className="gap-2 px-4 max-w-5xl mx-auto">
      <div className="relative flex flex-col gap-4 items-center p-12 rounded-md">
        <Avatar />
        <Info />
      </div>
      <div className="relative flex flex-col gap-8">
        <FriendTab userData={userData} />
        <FavoriteTab userData={userData}/>
      </div> 
    </div>
  ) : null;
};
