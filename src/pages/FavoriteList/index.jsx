import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CardList from "../../components/Shared/CardList";
import { setPage } from "../../redux/actions/page";

const FavoriteList = () => {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPage("myList"));
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return userData ? (
    <div className="gap-2 px-4 max-w-5xl mx-auto">
      <CardList
        description="Your favorite shows"
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
