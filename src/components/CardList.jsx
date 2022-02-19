import React from "react";
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
  return (
    <div>
      <div className="flex justify-between items-center text-xl rounded-md gap-4">
        <div className="font-bold">{description}</div>
        {data && data.length > limit && loadMoreBtn && (
          <button className="text-sm font-semibold border-2 border-gray-700 px-8 py-1 rounded-full">
            More
          </button>
        )}
      </div>
      {data && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4 pt-2">
          {data.slice(0, limit).map((each, index) => {
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
  );
};

export default CardList;
