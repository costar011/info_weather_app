export const getCurrentDate = () => {
  const D = new Date();

  const year = D.getFullYear();
  let month = D.getMonth() + 1;
  let date = D.getDate();
  let day = D.getDay();

  month = month < 10 ? `0` + month : month;
  date = date < 10 ? `0` + date : date;

  let hour = D.getHours();
  let min = D.getMinutes();

  hour = hour < 10 ? `0` + hour : hour;
  min = min < 10 ? `0` + min : min;

  switch (day) {
    case 0:
      day = "일";
      break;
    case 1:
      day = "월";
      break;
    case 2:
      day = "화";
      break;
    case 3:
      day = "수";
      break;
    case 4:
      day = "목";
      break;
    case 5:
      day = "금";
      break;
    case 6:
      day = "토";
      break;
  }

  const resultDate = `${year}. ${month}. ${date} (${day})`;
  const resultTime = `${hour}:${min}`;

  return {
    currentDate: resultDate,
    currentTime: resultTime,
  };
};
