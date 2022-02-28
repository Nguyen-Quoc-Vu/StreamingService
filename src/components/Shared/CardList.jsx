import React, { useState, useEffect } from "react";
import CastCard from "../show/CastCard";
import ShowCard from "./ShowCard";
import UserCard from "./UserCard";
const CardList = ({
  description = "",
  type,
  data,
  limit = 0,
  loading,
  loadMoreBtn = true,
}) => {
  const [numberOfCard, setNumberOfCard] = useState(limit);
  const handleBtnClick = () => {
    if (numberOfCard < data.length) {
      setNumberOfCard((prevState) => prevState + 10);
    }
    if (numberOfCard > data.length) {
      setNumberOfCard(data.length);
    }
  };
  useEffect(() => {
    setNumberOfCard(limit);
  }, [limit]);

  const LoadingCard = ({ type }) => (
    <div
      className={`bg-gray-700 ${
        type === `user` ? `rounded-full h-40 w-40` : `rounded-sm h-64`
      } `}
    ></div>
  );

  return data ? (
    <div className="flex  justify-center flex-col gap-4">
      <div className="flex justify-between items-center text-2xl rounded-md gap-4 ">
        <div className="font-bold text-gray-200 border-l-8 pl-2 border-yellow-400">
          {data.length !== 0 ? description : "Nothing to show"}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {data.slice(0, numberOfCard).map((each, index) => {
          switch (type) {
            case "scheduleShow":
              return (
                <ShowCard
                  key={index}
                  name={each.show.name}
                  description={each.rating?.average}
                  thumbnail={each.show.image?.medium}
                  id={each.show.id}
                />
              );
            case "searchShow": {
              return (
                <ShowCard
                  key={index}
                  name={each.show.name}
                  description={each.rating?.average}
                  thumbnail={each.show.image?.medium}
                  id={each.show.id}
                />
              );
            }
            case "show":
              return (
                <ShowCard
                  key={index}
                  name={each.name}
                  description={each.rating?.average}
                  thumbnail={each.image?.medium}
                  id={each.id}
                />
              );
            case "myList":
              return (
                <ShowCard
                  key={index}
                  name={each.name}
                  description={each.description}
                  thumbnail={each.thumbnail}
                  id={each.id}
                />
              );

            case "cast":
              return (
                <CastCard
                  key={index}
                  thumbnail={each.person.image}
                  actor={each.person.name}
                  character={each.character.name}
                />
              );
            case "user":
              return (
                <UserCard
                  key={index}
                  thumbnail={each.photoURL}
                  name={each.name}
                  id={each.uid}
                />
              );
            default:
              return null;
          }
        })}
      </div>
      {console.log(data.length, numberOfCard)}
      {data.length > numberOfCard && loadMoreBtn && (
        <button
          className="text-sm font-semibold border-2 border-gray-200 hover:bg-gray-700 w-1/2 px-8 py-2 rounded-full self-center"
          onClick={handleBtnClick}
        >
          Load More
        </button>
      )}
    </div>
  ) : (
    <div>
      <div className="w-2/6 h-10 mb-4 rounded-md bg-gray-700"></div>
      <div className="min-w-full grid gap-4 grid-cols-5 mb-4 animate-pulse">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x, i) => (
          <LoadingCard type={type} key={i} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
