import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CardList from "../../components/Shared/CardList";
import { useFetch } from "../../hooks/useFetch";
import { setPage } from "../../redux/actions/page";
import { SCHEDULE_URL } from "../../utils/constant";
import { getLastYearDate, getYesterdayDate } from "../../utils/functions";

const Home = () => {
  const scheduleData = useFetch(SCHEDULE_URL);
  const yesterdayScheduleData = useFetch(
    SCHEDULE_URL + `?date=${getLastYearDate()}`
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPage("home"));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-8 px-4 max-w-5xl mx-auto">
      <CardList
        description="Popular shows airing tonight"
        data={scheduleData.data}
        loading={scheduleData.loading}
        limit={20}
        type="scheduleShow"
      />
      <CardList
        description="Maybe you have missed"
        data={yesterdayScheduleData.data}
        limit={20}
        loading={yesterdayScheduleData.loading}
        type="scheduleShow"
      />
    </div>
  );
};

export default Home;
