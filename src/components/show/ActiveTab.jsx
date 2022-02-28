import React from "react";

import CardList from "../Shared/CardList";
import noImg from "../../assets/no-img.png";

const ActiveTab = ({
  id,
  activeTab,
  castData,
  imageData,
  seasonData,
  episodeData,
}) => {
  switch (activeTab) {
    case "Cast":
      return (
        <CardList
          description="Cast"
          data={castData.data}
          limit={10}
          loading={castData.loading}
          type="cast"
        />
      );
    case "Gallery":
      return <Gallery imageData={imageData.data} />;
    case "Season":
      return <Season seasonData={seasonData.data} episodeData={episodeData} />;
    default:
      return null;
  }
};

const Gallery = ({ imageData }) => {
  return (
    imageData && (
      <div className="container px-5 py-2">
        <div className="flex flex-wrap -m-1 md:-m-2">
          {imageData.map((each, index) => (
            <div key={index} className="flex flex-wrap w-1/3">
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="cursor-pointer hover:scale-125 duration-75 block object-cover object-center w-full h-full rounded-lg"
                  src={each.resolutions.original.url}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

const Season = ({ seasonData, episodeData }) => {
  console.log(seasonData);
  return (
    seasonData && (
      <div className="w-full">
        {seasonData.map((each, index) => (
          <div
            key={index}
            className="flex gap-4 py-4 border-b-2 border-gray-700 "
          >
            <img
              alt="gallery"
              className="block object-cover object-center w-1/6 rounded-lg"
              src={each.image?.medium ? each.image.medium : noImg}
            />
            <div className="flex flex-col align-center gap-2">
              <div className="font-semibold text-2xl">Season {each.number}</div>
              <div>
                <span className="font-bold">Premiere date: </span>
                {each.premiereDate}
              </div>
              <div>
                <span className="font-bold">End date: </span>
                {each.endDate}
              </div>
              <div>
                <span className="font-bold">Network: </span>
                {each.network?.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};
export default ActiveTab;
