const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const convertDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return {
      year: date.getFullYear(),
      month: MONTHS[date.getMonth()],
      date: date.getDate(),
      day: date.getDay(),
      hours: date.getHours(),
      minutes: date.getMinutes()
  };
};