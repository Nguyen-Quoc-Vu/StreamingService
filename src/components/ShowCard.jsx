import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeartIcon from "../assets/icons/HeartIcon";
import NoImg from "../assets/no-img.png";
import { useDispatch, useSelector } from "react-redux";
import { updateMyList } from "../redux/actions/userData";
import { updateUserMovieList } from "../firebase/firebase";
import StarIcon from "../assets/icons/StarIcon";
const ShowCard = ({ thumbnail, name, description, id }) => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const handleOnCardClick = (id) => {
    navigate(`/shows/${id}`);
  };

  const handleOnFavClick = (myList) => {
    const newDescription = description ? description : "Not rate";
    if (!favorite) {
      const newList = [
        ...myList,
        { thumbnail, name, description: newDescription, id },
      ];
      dispatch(updateMyList(newList));
      updateUserMovieList(userData.uid, newList);
      // const newList = [...myList, { thumbnail, name, description, id }];
      // dispatch(updateMyList(newList));
      // updateUserMovieList(userData.uid, thumbnail, name, description, id);
    } else {
      const newList = userData.myList.filter((each) => each.id !== id);
      dispatch(updateMyList(newList));
      updateUserMovieList(userData.uid, newList);
    }
  };

  useEffect(() => {
    if (userData?.myList) {
      const isFound = userData.myList.find((each) => each.id === id);
      setFavorite(isFound);
    }
  }, [id, userData]);

  return (
    <div className="pb-4 flex flex-col rounded-lg">
      <div className="relative h-64">
        <img
          src={thumbnail ? thumbnail : NoImg}
          alt=""
          className="cursor-pointer rounded-lg object-cover object-center w-full h-full"
          onClick={() => handleOnCardClick(id)}
        />
        {userData && (
          <button
            onClick={() => handleOnFavClick(userData.myList)}
            className="absolute bottom-2 border-gray-600 left-1 backdrop-blur-md shadow-lg float-right rounded-full text-blue-400 hover:text-blue-500 hover:bg-gray-600 font-semibold p-2 mt-2"
          >
            <HeartIcon fill={favorite} />
          </button>
        )}
      </div>
      <div className="relative text-left px-3 pt-2 cursor-pointer">
        <div
          className="text-xl font-bold"
          onClick={() => handleOnCardClick(id)}
        >
          {name}
        </div>
        <div className="text-md text-gray-100 font-bold flex items-center gap-1">
          {/* <StarIcon /> */}
          {/* {description ? description : "NA"} */}
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
