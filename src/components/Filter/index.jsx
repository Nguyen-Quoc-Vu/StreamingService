import React, { useEffect, useState } from "react";

const Filter = ({ setFilterList, allShow }) => {
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const handleChangeLanguage = (data) => {
    setType(data);
  };
  const handleChangeStatus = (data) => {
    setStatus(data);
  };
  const handleChangeRating = (data) => {
    setRating(data);
  };
  const handleResetFIlter = () => {
    setType("");
    setRating("");
    setStatus("");
  };

  useEffect(() => {
    let newData = allShow;
    if (type !== "") {
      newData = newData.filter((each) => each.type === type);
    }
    if (status !== "") {
      newData = newData.filter((each) => each.status === status);
    }
    if (rating !== "") {
      console.log(rating);
      const [lowest, highest] = rating.split("-");
      console.log(lowest);
      newData = newData.filter(
        (each) => each.rating.average >= lowest && each.rating.average < highest
      );
    }
    setFilterList(newData);
  }, [allShow, type, rating, setFilterList, status]);

  return (
    <div className="w-full shadow p-5 mb-5 rounded-lg bg-gray-800">
      {/* <div className="relative">
        <div className="absolute flex items-center ml-2 h-full">
          <svg
            className="w-4 h-4 fill-current text-primary-gray-dark"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
          </svg>
        </div>

        <input
          type="text"
          placeholder="Search by listing, location, bedroom number..."
          className="px-8 py-3 w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-800 focus:ring-0 text-sm"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="font-medium text-lg">Filters</p>
        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-200 text-gray-300 text-sm font-medium rounded-md">
          Reset Filter
        </button>
      </div> */}

      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          <select
            value={type}
            className="px-4 py-3 w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-800 focus:ring-0 text-sm"
            onChange={(e) => handleChangeLanguage(e.target.value)}
          >
            <option value="">Any type</option>
            <option value="Reality">Reality</option>
            <option value="Talk Show">Talk Show</option>
            <option value="Variety">Variety</option>
            <option value="Scripted">Scripted</option>
            <option value="Animation">Animation</option>{" "}
            <option value="Documentary">Documentary</option>
          </select>
          <select
            value={status}
            onChange={(e) => handleChangeStatus(e.target.value)}
            className="px-4 py-3 w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-800 focus:ring-0 text-sm"
          >
            <option value="">Any Status</option>
            <option value="Ended">Ended</option>
            <option value="Running">Running</option>
          </select>
          <select
            value={rating}
            onChange={(e) => handleChangeRating(e.target.value)}
            className="px-4 py-3 w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-800 focus:ring-0 text-sm"
          >
            <option value="">Rating</option>
            <option value="0-4">From 1 to 5</option>
            <option value="4-8">From 6 to 8</option>
            <option value="8-10">From 8 to 10</option>
          </select>
          <button
            onClick={handleResetFIlter}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-medium rounded-md"
          >
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
