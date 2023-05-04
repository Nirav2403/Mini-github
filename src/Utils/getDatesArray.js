export const getDaysBetweenDates = function (startDate, endDate) {
  let now = startDate.clone();
  let dates = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format("MM/DD/YYYY"));
    now.add(1, "days");
  }
  return dates;
};
