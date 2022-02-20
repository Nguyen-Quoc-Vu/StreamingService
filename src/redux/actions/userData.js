export const setUserData = (data) => {
  return {
    type: "SET_USER_DATA",
    payload: data,
  };
};

export const updateMyList = (newList) => {
  return {
    type: "UPDATE_MY_LIST",
    payload: newList,
  };
};
