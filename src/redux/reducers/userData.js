export const userDataReducer = (state = null, action) => {
  const { payload, type } = action;
  switch (type) {
    case "SET_USER_DATA":
      return payload;
    case "UPDATE_MY_LIST":
      return { ...state, myList: payload };
    case "ADD_SENT_REQUESTS":
      return {
        ...state,
        sentFriendRequests: [...state.sentFriendRequests, payload],
      };

    case "ADD_RECEIVED_REQUESTS": {
      return {
        ...state,
        pendingFriendRequests: [...state.pendingFriendRequests, payload],
      };
    }
    case "REMOVE_FROM_SENT_REQUESTS": {
      const newList = state.sentFriendRequests.filter(
        (eachUID) => eachUID !== payload
      );
      return { ...state, sentFriendRequests: newList };
    }

    case "REMOVE_FROM_RECEIVED_REQUESTS": {
      const newList = state.pendingFriendRequests.filter(
        (eachUID) => eachUID !== payload
      );
      return { ...state, pendingFriendRequests: newList };
    }

    case "ADD_TO_FRIEND_LIST": {
      return {
        ...state,
        friends: [...state.friends, payload],
      };
    }

    case "REMOVE_FRIEND": {
      const newList = state.pendingFriendRequests.filter(
        (eachUID) => eachUID !== payload
      );
      return { ...state, friends: newList };
    }

    default:
      return state;
  }
};
