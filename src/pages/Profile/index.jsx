import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NoImg from "../../assets/no-img.png";
import CardList from "../../components/Shared/CardList";
import FriendCard from "../../components/Profile/FriendCard";

export const Profile = () => {
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <div className="text-2xl break-words">{userData.name}</div>
      <div className="add font-semibold text-base italic dark">
        {userData.email}
      </div>
    </div>
  );

  const FriendTab = ({ userData }) => (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-2xl border-l-8 border-yellow-500 pl-4">
        Friends ({userData.friends.length})
      </div>
      <div className="grid grid-cols-5">
        {userData?.friends?.map((friendID, index) => {
          return <FriendCard key={index} friendID={friendID} />;
        })}
      </div>
    </div>
  );

  const FriendRequestTab = ({ userData }) => (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-2xl border-l-8 border-yellow-500 pl-4">
        Friend Requests ({userData.pendingFriendRequests.length})
      </div>
      <div className="grid grid-cols-5">
        {userData?.pendingFriendRequests?.map((friendID, index) => {
          return <FriendCard key={index} friendID={friendID} />;
        })}
      </div>
    </div>
  );

  const FavoriteTab = ({ userData }) => (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-2xl border-l-8 border-yellow-500 pl-4">
        Favorite list ({userData.myList.length})
      </div>
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
      <div className="relative flex flex-col gap-4 items-center rounded-md backdrop-blur-xl pb-12">
        <img
          src={userData.photoURL ? userData.photoURL : NoImg}
          alt="cover"
          className="absolute w-full h-full object-cover blur object-middle brightness-50 -z-10"
        />
        <Avatar />
        <Info />
      </div>
      <div className="relative flex flex-col gap-8 py-12">
        <FriendTab userData={userData} />
        <FriendRequestTab userData={userData} />
        <FavoriteTab userData={userData} />
      </div>
    </div>
  ) : null;
};
