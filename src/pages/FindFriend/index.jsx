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
    <div className="gap-2 px-4 max-w-5xl mx-auto">
    <CardList description="People" data={allUsers} limit={100} type="user" />
    </div>
  );
};

export default FindFriend;
