import React from "react";
import CardList from "../../components/CardList";
import { useFetch } from "../../hooks/useFetch";
import { SCHEDULE_URL } from "../../utils/constant";
import { getYesterdayDate } from "../../utils/functions";

const Home = () => {
  const scheduleData = useFetch(SCHEDULE_URL);
  const yesterdayScheduleData = useFetch(
    SCHEDULE_URL + `?date=${getYesterdayDate()}`
  );
  return (
    <div className="gap-2 px-4 max-w-5xl mx-auto">
      <CardList
        description="Popular shows airing tonight"
        data={scheduleData.data}
        loading={scheduleData.loading}
        limit={10}
        type="scheduleShow"
      />
      <CardList
        description="Maybe you have missed"
        data={yesterdayScheduleData.data}
        limit={10}
        loading={yesterdayScheduleData.loading}
        type="scheduleShow"
      />
    </div>
  );
};

export default Home;
