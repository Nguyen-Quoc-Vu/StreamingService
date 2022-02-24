import React, { useState } from "react";
import { getUserData } from "../../firebase/firebase";
import NoImg from "../../assets/no-img.png";
import { useNavigate } from "react-router-dom";
import Avatar from "../User/Avatar";

const FriendCard = ({ friendID }) => {
  const navigate = useNavigate();
  const [friendData, setFriendData] = useState(null);
  const fetchData = async () => {
    try {
      const data = await getUserData(friendID);
      setFriendData(data);
    } catch (e) {
      console.log(friendData);
    }
  };
  useState(() => {
    fetchData();
  }, []);

  const onCardClick = () => {
    navigate(`/profile/${friendData.uid}`);
  };

  return friendData ? (
    <div
      onClick={onCardClick}
      className="flex flex-col gap-2 items-center hover:bg-gray-700 rounded-md cursor-pointer duration-150 p-2"
    >
     <Avatar userData={friendData}/>
      <div className="font-bold">{friendData.name}</div>
    </div>
  ) : null;
};

export default FriendCard;
