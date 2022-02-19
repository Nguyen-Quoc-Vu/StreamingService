import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ActiveTab from "../../components/show/ActiveTab";
import { ShowInfo } from "../../components/show/ShowInfo";
import { useFetch } from "../../hooks/useFetch";

const ShowDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Cast");
  const showData = useFetch(`https://api.tvmaze.com/shows/${id}`);
  const castData = useFetch(`https://api.tvmaze.com/shows/${id}/cast`);
  const seasonData = useFetch(`https://api.tvmaze.com/shows/${id}/seasons`);
  const imageData = useFetch(`https://api.tvmaze.com/shows/${id}/images`);
  return (
    showData.data && (
      <div className="py-2 flex justify-center px-4">
        <div className="max-w-5xl flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <div className="text-5xl">{showData.data.name}</div>
              <div className="flex gap-2">
                {showData.data.type === "Scripted" ? (
                  showData.data.genres.map((each, index) => (
                    <div
                      key={index}
                      className="border border-gray-400 px-2 py-1 text-sm rounded-full font-bold"
                    >
                      {each}
                    </div>
                  ))
                ) : (
                  <div className="border border-gray-400 px-2 py-1 text-sm rounded-full font-bold">
                    {showData.data.type}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 md:gap-0">
            <div className="relative w-full md:w-2/6 p-2">
              <img
                src={showData.data.image.medium}
                alt=""
                className="cursor-pointer rounded-md w-full "
              />
            </div>
            <div className="text-justify w-full md:w-4/6 px-2">
              <ShowInfo {...showData.data} />
              <div className="text-justify w-full md:w-5/5  ">
                <div className="font-bold border-t border-gray-600 mt-2 pt-2">
                  Description
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: showData.data.summary,
                  }}
                ></p>
              </div>
            </div>
            <div className="bg-gray-800 text-gray-500 py-2 w-full flex justify-around font-bold rounded-md my-2">
              {["Cast", "Season", "Gallery"].map((each, index) => {
                return (
                  <button
                    key={index}
                    className={
                      activeTab === each
                        ? "text-gray-200 cursor-pointer font-bold"
                        : "cursor-pointer font-semibold "
                    }
                    onClick={() => setActiveTab(each)}
                  >
                    {each}
                  </button>
                );
              })}
            </div>
            <ActiveTab
              activeTab={activeTab}
              id={id}
              castData={castData}
              seasonData={seasonData}
              imageData={imageData}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default ShowDetail;
