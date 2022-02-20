import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import HeartIcon from "../../components/icons/HeartIcon";
import LikeIcon from "../../components/icons/LikeIcon";
import ActiveTab from "../../components/show/ActiveTab";
import { ShowInfo } from "../../components/show/ShowInfo";
import {
  getLikes,
  giveALike,
  IsUserHasAlreadyLike,
  updateUserMovieList,
} from "../../firebase/firebase";
import { useFetch } from "../../hooks/useFetch";
import { updateMyList } from "../../redux/actions/userData";

const ShowDetail = () => {
  const { id } = useParams();
  const [favorite, setFavorite] = useState(null);
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("Cast");
  const showData = useFetch(`https://api.tvmaze.com/shows/${id}`);
  const castData = useFetch(`https://api.tvmaze.com/shows/${id}/cast`);
  const seasonData = useFetch(`https://api.tvmaze.com/shows/${id}/seasons`);
  const episodeData = useFetch(`https://api.tvmaze.com/shows/${id}/episodes`);
  const imageData = useFetch(`https://api.tvmaze.com/shows/${id}/images`);
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const getLikeData = async (id) => {
    const likes = await getLikes(id);
    let hasUserLiked = false;
    if (likes) {
      setLike(likes.users.length);
      hasUserLiked = IsUserHasAlreadyLike(likes.users, userData.uid);
    }
    setIsLiked(hasUserLiked);
  };

  const handleLikeBtn = async () => {
    if (userData) {
      await giveALike(id, userData.uid);
      getLikeData(id);
    } else {
      alert("Please login to use this function");
    }
  };

  useEffect(() => {
    getLikeData(id);
  }, []);

  useEffect(() => {
    if (userData) {
      const isFound = userData.myList.findIndex((each) => {
        return String(each.id) === id;
      });
      setFavorite(isFound);
    }
  }, [id, userData]);

  const handleOnFavClick = (myList, description, thumbnail, name, id) => {
    const newDescription = description ? description : "";
    if (favorite === -1) {
      const newList = [...myList, { thumbnail, name, newDescription, id }];
      dispatch(updateMyList(newList));
      updateUserMovieList(userData.uid, newList);
    } else {
      const newList = userData.myList.filter((each) => String(each.id) !== id);
      dispatch(updateMyList(newList));
      updateUserMovieList(userData.uid, newList);
    }
  };
  return (
    showData.data && (
      <div className="py-2 flex justify-center px-4">
        <div className="max-w-5xl flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <div className="text-5xl">{showData.data.name}</div>
              <div className="flex gap-2">
                {showData.data.type === "Scripted" ? (
                  showData.data.genres.map((each, index) => (
                    <div
                      key={index}
                      className="border border-gray-400 px-2 py-1 text-sm rounded-full font-bold"
                    >
                      {each}
                    </div>
                  ))
                ) : (
                  <div className="border border-gray-400 px-2 py-1 text-sm rounded-full font-bold">
                    {showData.data.type}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 md:gap-0">
            <div className="relative w-full md:w-2/6 p-2">
              <img
                src={showData.data.image.medium}
                alt=""
                className="cursor-pointer rounded-md w-full "
              />
            </div>
            <div className="text-justify w-full md:w-4/6 px-2">
              <ShowInfo {...showData.data} />
              <div className="text-justify w-full md:w-5/5">
                <div className="font-bold border-t border-gray-600 mt-2 pt-2">
                  Description
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: showData.data.summary,
                  }}
                ></p>
              </div>
              <button
                onClick={() =>
                  handleOnFavClick(
                    userData.myList,
                    showData.data.summary,
                    showData.data.image.medium,
                    showData.data.name,
                    id
                  )
                }
                className={`w-full bg-red-900 hover:bg-red-700 mt-4 py-1 rounded-full flex justify-center ${
                  !userData && "hidden"
                }`}
              >
                <HeartIcon fill={favorite !== -1 ? true : false} />
              </button>{" "}
              <button
                onClick={() => handleLikeBtn()}
                className={`w-full font-bold bg-blue-900 hover:bg-blue-700 mt-4 py-1 rounded-full flex justify-center items-center gap-2`}
              >
                <LikeIcon fill={isLiked} />({like})
              </button>
            </div>
            <div className="bg-gray-800 text-gray-500 py-2 w-full flex justify-around font-bold rounded-md my-2">
              {["Cast", "Season", "Gallery"].map((each, index) => {
                return (
                  <button
                    key={index}
                    className={
                      activeTab === each
                        ? "text-gray-200 cursor-pointer font-bold"
                        : "cursor-pointer font-semibold "
                    }
                    onClick={() => setActiveTab(each)}
                  >
                    {each}
                  </button>
                );
              })}
            </div>
            <ActiveTab
              activeTab={activeTab}
              id={id}
              castData={castData}
              seasonData={seasonData}
              imageData={imageData}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default ShowDetail;
