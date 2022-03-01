import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CardList from "../../components/Shared/CardList";
import { useFetch } from "../../hooks/useFetch";
import { setPage } from "../../redux/actions/page";

const Search = () => {
  const [searchParams] = useSearchParams();
  const { data, loading } = useFetch(
    `https://api.tvmaze.com/search/shows?q=${searchParams.get("q")}`
  );
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(setPage(null));
  }, [dispatch]);

  return (
    data && (
      <div className="px-4 max-w-5xl mx-auto">
        <CardList
          description=""
          data={data}
          loading={loading}
          limit={data.length}
          type="searchShow"
          loadMoreBtn={false}
        />
      </div>
    )
  );
};

export default Search;
