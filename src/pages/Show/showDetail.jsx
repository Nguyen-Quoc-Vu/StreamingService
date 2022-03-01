import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HeartIcon from "../../assets/icons/HeartIcon";
import LikeIcon from "../../assets/icons/LikeIcon";
import ActiveTab from "../../components/show/ActiveTab";
import StarIcon from "../../assets/icons/StarIcon";
import { ShowInfo } from "../../components/show/ShowInfo";
import {
  getLikes,
  giveALike,
  IsUserHasAlreadyLike,
  updateUserMovieList,
} from "../../firebase/firebase";
import { useFetch } from "../../hooks/useFetch";
import { updateMyList } from "../../redux/actions/userData";
import { SHOWS_URL } from "../../utils/constant";

const ShowDetail = () => {
  const { id } = useParams();
  const [favorite, setFavorite] = useState(null);
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("Cast");
  const showData = useFetch(`${SHOWS_URL}/${id}`);
  const castData = useFetch(`${SHOWS_URL}/${id}/cast`);
  const seasonData = useFetch(`${SHOWS_URL}/${id}/seasons`);
  const episodeData = useFetch(`${SHOWS_URL}/${id}/episodes`);
  const imageData = useFetch(`${SHOWS_URL}/${id}/images`);
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const getLikeData = useCallback(
    async (id) => {
      const likes = await getLikes(id);
      let hasUserLiked = false;
      if (likes) {
        setLike(likes.users.length);
        if (userData) {
          hasUserLiked = IsUserHasAlreadyLike(likes.users, userData.uid);
        }
      }
      setIsLiked(hasUserLiked);
    },
    [userData]
  );

  const handleLikeBtn = async () => {
    if (userData) {
      await giveALike(id, userData.uid);
      getLikeData(id);
    } else {
      alert("Please login to use this function");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    getLikeData(id);
  }, [getLikeData, id]);

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
  return showData.data ? (
    <div className="pb-2 flex justify-center px-4 -mt-14">
      <img
        src={showData.data.image.medium}
        alt="cover"
        className="absolute w-full blur-xl h-full object-cover object-top brightness-50 animate-pulse-slow transition-all"
      />
      <div className="max-w-5xl flex flex-col gap-2 relative backdrop-blur-3xl p-6 rounded-lg shadow-2xl mt-20">
        <div className="flex justify-between">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between">
              <div className="text-5xl font-serif">{showData.data.name}</div>
              {showData.data.rating?.average && (
                <div className="text-5xl flex gap-1 items-center">
                  <StarIcon />
                  <div>{showData.data.rating?.average}</div>
                  <span className="text-2xl self-end">/10</span>
                </div>
              )}
            </div>

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
              src={showData.data.image.original}
              alt=""
              className="cursor-pointer rounded-md w-full shadow"
            />
          </div>
          <div className="text-justify w-full md:w-4/6 px-2 text-white">
            <ShowInfo {...showData.data} />
            <div className="text-justify w-full md:w-5/5">
              <div className="font-bold border-t border-gray-200 mt-2 pt-2 ">
                Description
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: showData.data.summary,
                }}
              ></p>
            </div>
            <div className="flex gap-4 shadow-xl border-gray  p-2 rounded-full  ">
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
                className={`w-1/2 mt-4 py-1 rounded-full flex justify-center hover:scale-110 transition ease-in-out ${
                  !userData && "hidden"
                }`}
              >
                <HeartIcon fill={favorite !== -1 ? true : false} />
              </button>
              <button
                onClick={() => handleLikeBtn()}
                className={`w-1/2 font-bold mt-4 py-1 rounded-full flex justify-center items-center gap-2 hover:scale-110 transition ease-in-out`}
              >
                <LikeIcon fill={isLiked} />
                {like}
              </button>
            </div>
          </div>
          <div className="text-gray-100 py-2 w-full flex flex-grow justify-around font-bold rounded-md my-2 backdrop-blur-2xl mt-8">
            {["Cast", "Season", "Gallery"].map((each, index) => {
              return (
                <button
                  key={index}
                  className={
                    activeTab === each
                      ? "text-white text-xl cursor-pointer font-bold border-b-2"
                      : "cursor-pointer font-semibold text-gray-300 hover:text-gray-300 text-lg duration-100"
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
            episodeData={episodeData}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default ShowDetail;
