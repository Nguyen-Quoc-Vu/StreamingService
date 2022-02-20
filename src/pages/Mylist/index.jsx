import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CardList from "../../components/CardList";

const MyList = () => {
  const userData = useSelector((state) => state.userData);
  console.log(userData);
  return userData ? (
    <div className="gap-2 px-4 max-w-5xl">
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

export default MyList;
