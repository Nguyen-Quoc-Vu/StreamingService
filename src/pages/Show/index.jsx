import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.production.min";
import CardList from "../../components/CardList";
import { useFetch } from "../../hooks/useFetch";

export const Show = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error } = useFetch(
    `https://api.tvmaze.com/shows?page=${currentPage}`
  );
  const [totalShow, setTotalShow] = useState(10);
  const STEP = 20;
  const handleBtnClick = () => {
    if (totalShow >= data.length) {
      setCurrentPage((prevState) => prevState + 1);
      setTotalShow(10);
      window.scrollTo(0, 0);
    } else {
      setTotalShow((prevState) => prevState + STEP);
    }
  };
  return (
    <div className="px-4 max-w-5xl">
      <CardList
        description=""
        data={data}
        loading={loading}
        limit={totalShow}
        type="show"
        loadMoreBtn={false}
      />
      <button
        className="w-full p-2 hover:bg-gray-700 bg-gray-800 rounded-md"
        onClick={handleBtnClick}
      >
        Load more
      </button>
    </div>
  );
};
