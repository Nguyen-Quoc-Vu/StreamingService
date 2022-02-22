import React, { useState, useEffect } from "react";
import UserCard from "./Shared/UserCard";
import CastCard from "./show/CastCard";
import ShowCard from "./ShowCard";
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

  return data ? (
    <div>
      <div className="flex justify-between items-center text-xl rounded-md gap-4">
        <div className="font-bold text-gray-200">
          {data.length !== 0 ? description : "Nothing to show"}
        </div>
        {data.length > limit && loadMoreBtn && (
          <button
            className="text-sm font-semibold border-2 border-gray-700 px-8 py-1 rounded-full"
            onClick={handleBtnClick}
          >
            More
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4 pt-2">
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
    </div>
  ) : (
    <div></div>
  );
};

export default CardList;
