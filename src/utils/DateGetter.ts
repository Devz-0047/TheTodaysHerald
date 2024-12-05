const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const currentDate: Date = new Date();
const formattedDate: string = new Intl.DateTimeFormat("en-US", options).format(
  currentDate
);
export default formattedDate;
