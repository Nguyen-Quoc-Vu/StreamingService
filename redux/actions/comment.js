export const addComment = (title, description) => {
  return {
    type: "ADD_COMMENT",
    payload: { title, description },
  };
};
