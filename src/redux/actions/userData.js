import { useDispatch } from "react-redux";

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

export const addToSentRequestList = (uid) => {
  return {
    type: "ADD_SENT_REQUESTS",
    payload: uid,
  };
};

export const removeFromSentRequestList = (uid) => {
  return {
    type: "REMOVE_FROM_SENT_REQUESTS",
    payload: uid,
  };
};

export const addToReceivedRequestList = (uid) => {
  return {
    type: "ADD_RECEIVED_REQUESTS",
    payload: uid,
  };
};

export const removeFromReceivedRequestList = (uid) => {
  return {
    type: "REMOVE_FROM_RECEIVED_REQUESTS",
    payload: uid,
  };
};

export const addToFriendList = (uid) => {
  return {
    type: "ADD_TO_FRIEND_LIST",
    payload: uid,
  };
};

export const removeFriend = (uid) => {
  return {
    type: "REMOVE_FRIEND",
    payload: uid,
  };
};
