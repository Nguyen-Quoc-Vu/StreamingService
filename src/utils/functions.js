export const getYesterdayDate = () => {
  return new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    .toISOString()
    .substring(0, 10);
};

export const getLastYearDate = () => {
  return new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .substring(0, 10);
};
