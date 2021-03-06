import React from "react";
import NoImg from "../../assets/no-img.png";

const CastCard = ({ actor, character, thumbnail, characterThumbnail }) => {
  return (
    <div className="pb-4 flex flex-col rounded-lg hover:scale-110 duration-300">
      <div className="relative h-60">
        <img
          src={thumbnail ? thumbnail.medium : NoImg}
          alt=""
          className="cursor-pointer top-0 absolute z-10 transition-all hover:opacity-0 rounded-t-md w-full h-60 object-cover bg-gray-700"
        />
        <img
          src={characterThumbnail ? characterThumbnail.medium : NoImg}
          alt=""
          className="cursor-pointer top-0 absolute transition-all rounded-t-md w-full h-60 object-cover bg-gray-700"
        />
      </div>

      <div className="relative text-left px-3 pt-2 cursor-pointer">
        <div className="text-xl font-bold">{actor}</div>
        <div className="text-md text-gray-400">{character}</div>
      </div>
    </div>
  );
};

export default CastCard;
