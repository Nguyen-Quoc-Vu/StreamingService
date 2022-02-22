import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardList from "../../components/CardList";
import { getAllUsers } from "../../firebase/firebase";

const FindFriend = () => {
  const userData = useSelector((state) => state.userData);
  const [allUsers, setAllUsers] = useState();

  const fetchData = async () => {
    const data = await getAllUsers();
    if (userData) {
      const filteredData = data.filter((each) => each.uid !== userData.uid);
      setAllUsers(filteredData);
    } else {
      setAllUsers(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userData]);

  return (
    <CardList description="People" data={allUsers} limit={10} type="user" />
  );
};

export default FindFriend;
