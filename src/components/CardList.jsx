import React, { useState, useEffect } from "react";
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

  return (
    data && (
      <div>
        <div className="flex justify-between items-center text-xl rounded-md gap-4">
          <div className="font-bold">
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
        {data && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4 pt-2">
            {data.slice(0, numberOfCard).map((each, index) => {
              switch (type) {
                case "scheduleShow":
                  return (
                    <ShowCard
                      key={index}
                      name={each.show.name}
                      episode={each.name}
                      thumbnail={each.show.image}
                      id={each.show.id}
                    />
                  );
                case "searchShow": {
                  return (
                    <ShowCard
                      key={index}
                      name={each.show.name}
                      episode={each.show.language}
                      thumbnail={each.show.image}
                      id={each.show.id}
                    />
                  );
                }

                case "show":
                  return (
                    <ShowCard
                      key={index}
                      name={each.name}
                      episode={""}
                      thumbnail={each.image}
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
                default:
                  return null;
              }
            })}
          </div>
        )}
      </div>
    )
  );
};

export default CardList;
