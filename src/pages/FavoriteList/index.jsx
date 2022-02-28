import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CardList from "../../components/Shared/CardList";

const FavoriteList = () => {
  const userData = useSelector((state) => state.userData);
  return userData ? (
    <div className="gap-2 px-4 max-w-5xl mx-auto">
      <CardList
        description="My list"
        data={userData.myList}
        limit={100}
        type="myList"
      />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default FavoriteList;
