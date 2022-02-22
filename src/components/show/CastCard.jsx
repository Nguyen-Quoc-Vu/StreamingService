import React from "react";
import NoImg from "../../assets/no-img.png";

const CastCard = ({ actor, character, thumbnail }) => {
  return (
    <div className="pb-4 flex flex-col rounded-lg">
      <img
        src={thumbnail ? thumbnail.medium : NoImg}
        alt=""
        className="cursor-pointer rounded-t-md w-full object-cover"
      />
      <div className="relative text-left px-3 pt-2 cursor-pointer">
        <div className="text-xl font-bold">{actor}</div>
        <div className="text-md text-gray-400">{character}</div>
      </div>
    </div>
  );
};

export default CastCard;
