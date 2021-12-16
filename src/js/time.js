export default function getTime() {
  const time = new Date();
  let date = time.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let month = time.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  const year = time.getFullYear();
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${date}.${month}.${year} ${hours}:${minutes}`;
}
