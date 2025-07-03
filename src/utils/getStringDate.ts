export const getStringDate = (targetDate: Date) => {
  // 날짜를 YYYY-MM-DD 형식으로 변경
  if (!targetDate || isNaN(targetDate.getTime())) {
    return ""; // 혹은 new Date().toISOString().slice(0, 10);
  }
  const year = targetDate.getFullYear();
  let month: string = String(targetDate.getMonth() + 1);
  let date: string = String(targetDate.getDate());
  if (month.length < 2) {
    month = `0${month}`;
  }
  if (date.length < 2) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};
