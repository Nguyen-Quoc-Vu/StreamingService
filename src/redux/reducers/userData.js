export const userDataReducer = (state = null, action) => {
  const { payload, type } = action;
  switch (type) {
    case "SET_USER_DATA":
      return payload;
    case "UPDATE_MY_LIST":
      return { ...state, myList: payload };
    default:
      return state;
  }
};
