export const pageReducer = (state = null, action) => {
  const { payload, type } = action;
  switch (type) {
    case "SET_PAGE":
      return payload;
    default:
      return state;
  }
};
