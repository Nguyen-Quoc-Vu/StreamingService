import { map } from "@firebase/util";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import NoImg from "../../assets/no-img.png";
import CardList from "../../components/CardList";
import { getUserData } from "../../firebase/firebase";

export const OtherProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const userData = useSelector((state) => state.userData);
  const [isFriend, setIsFriend] = useState(true);

  useEffect(() => {
    if (userData) {
      const isFound = userData.friends.find((friendID) => friendID === id);
      console.log(isFound);
      if (isFound) {
        setIsFriend(true);
      } else {
        setIsFriend(false);
      }
    } else {
      setIsFriend(false);
    }
  }, [userData]);

  const fetchData = useCallback(async () => {
    const fetchedData = await getUserData(id);
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const Avatar = () => (
    <div className="w-28 h-28 flex m-3text-white">
      <img
        className="p-1 rounded-full object-cover border-4"
        src={data.photoURL ? data.photoURL : NoImg}
        alt=""
      />
    </div>
  );
  const Info = () => (
    <div className="title font-bold text-center">
      <div className="name break-words">{data.name}</div>
      <div className="add font-semibold text-sm italic dark">{data.email}</div>
    </div>
  );

  const AddFriendButton = ({ isFriend }) => {
    return (
      <div
        className={`${
          isFriend
            ? "bg-red-700 hover:bg-red-600"
            : "bg-green-700 hover:bg-green-600"
        } cursor-pointer w-full font-bold text-center py-2 rounded-full`}
      >
        {isFriend ? "Remove friend" : "Add friend"}
      </div>
    );
  };

  return data ? (
    <div className="grid grid-cols-1 gap-3 rounded-lg max-w-4xl px-4">
      <div className="flex flex-col gap-4 items-center p-12 rounded-md w-full">
        <Avatar />
        <Info />
      </div>
      <AddFriendButton isFriend={isFriend} />
      {isFriend && (
        <CardList
          description="Favorite list"
          data={data.myList}
          limit={100}
          type="myList"
        />
      )}
    </div>
  ) : (
    <div></div>
  );
};
