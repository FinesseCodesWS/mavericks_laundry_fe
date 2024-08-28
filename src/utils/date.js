/**
 * convert to db date format to local date string
 * @params {value, show_time} value is the date to be converted. show_time is a boolean that determines whether to show the time alongside the date; default show_time is false
 * @returns {string}
 */
export const toDateString = (value, show_time = false) => {
  if (show_time) {
    return value?.length > 13
      ? `${new Date(value).toDateString()} ${new Date(
          value
        ).toLocaleTimeString()}`
      : `${new Date(parseInt(value)).toDateString()} ${new Date(
          parseInt(value)
        ).toLocaleTimeString()}`;
  }

  return value?.length > 13
    ? new Date(value).toDateString()
    : new Date(parseInt(value)).toDateString();
};
