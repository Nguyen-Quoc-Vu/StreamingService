import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardList from "../../components/CardList";
import Avatar from "../../components/User/Avatar";
import Button from "../../components/User/Button";
import Info from "../../components/User/Info";
import { getUserData } from "../../firebase/firebase";
import { RELATION } from "../../utils/constant";
import {
  hasReceiveRequest,
  hasSentRequest,
  isFriend,
} from "../../utils/friend";

const User = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState();
  const admin = useSelector((state) => state.userData);
  const [relation, setRelation] = useState(RELATION.NOT_FRIEND);

  const fetchData = useCallback(async () => {
    const fetchedData = await getUserData(id);
    if (fetchedData) {
      setUserData(fetchedData);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  useEffect(() => {
    if (admin && userData) {
      if (isFriend(admin, id)) {
        setRelation(RELATION.FRIEND);
        console.log("friend");
      } else if (hasSentRequest(admin, id)) {
        console.log("sent");
        setRelation(RELATION.SENT_REQUEST);
      } else if (hasReceiveRequest(admin, id)) {
        setRelation(RELATION.REQUEST_RECEIVED);
        console.log("request");
      } else {
        setRelation(RELATION.NOT_FRIEND);
      }
    }
  }, [id, admin, userData]);

  return userData  ? (
    <div className="gap-2 px-4 max-w-5xl mx-auto">
      <div className="flex flex-col gap-4 items-center p-12 rounded-md w-full">
        <Avatar userData={userData} />
        <Info userData={userData} />
      </div>
      {admin &&  <Button relation={relation} adminUID={admin.uid} userUID={userData.uid} />}
      {relation === RELATION.FRIEND && (
        <CardList
          description="Favorite list"
          data={userData.myList}
          limit={100}
          type="myList"
        />
      )}
    </div>
  ) : null;
};
export default User;
