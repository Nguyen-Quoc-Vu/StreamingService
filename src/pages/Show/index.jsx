import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CardList from "../../components/CardList";
import Filter from "../../components/Filter";
import { useFetch } from "../../hooks/useFetch";

export const Show = () => {
  const [searchParams] = useSearchParams();
  const STEP = 20;

  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? searchParams.get("page") : "1"
  );
  const { data, loading, error } = useFetch(
    `https://api.tvmaze.com/shows?page=${currentPage}`
  );
  const [totalShow, setTotalShow] = useState(25);
  const [btnText, setBtnText] = useState("Load more");
  const [filterList, setFilterList] = useState(data);

  const handleBtnClick = () => {
    if (totalShow >= filterList.length) {
      setCurrentPage((prevState) => Number(prevState) + 1);
      setTotalShow(10);
      setBtnText("Load more");
    } else {
      if (totalShow + STEP >= filterList.length) {
        setBtnText("Next page");
      }
      setTotalShow((prevState) => prevState + STEP);
    }
  };
  return (
    data && (
      <div className="px-4 max-w-5xl">
        <Filter setFilterList={setFilterList} allShow={data} />
        <div className="flex justify-between">
          <div className="text-2xl font-bold">
            {filterList?.length} result(s) - Page {currentPage}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setCurrentPage((prevState) => Number(prevState) - 1);
              }}
              className={Number(currentPage) === 1 ? "hidden" : ""}
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prevState) => Number(prevState) + 1)
              }
            >
              Next
            </button>
          </div>
        </div>

        <CardList
          description=""
          data={filterList}
          loading={loading}
          limit={totalShow}
          type="show"
          loadMoreBtn={false}
        />
        <button
          className={`w-full p-2 hover:bg-gray-700 bg-gray-800 rounded-md ${
            totalShow >= filterList?.length ? "hidden" : "block"
          }`}
          onClick={handleBtnClick}
        >
          {btnText}
        </button>
      </div>
    )
  );
};
