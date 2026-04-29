import moment from "moment";

export const DateUtils = {
  DATE_LOCAL_TIME: 'YYYY-MM-DD HH:mm:ss',         // <input type="datetime-local" />
  DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
  DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
  DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
  DATETIME_LOCAL_MS_WITHOUT_T: 'YYYY-MM-DDTHH:mm:ss.SSS',
  DATE: 'YYYY-MM-DD',
  DATE_LOCAL: 'DD/MM/YYYY',
  DATE_TIME: 'HH:mm DD/MM/YYYY',                             // <input type="date" />
  TIME: 'HH:mm',
  DAY_TIME: 'HH:mm DD/MM',                         // <input type="time" />
  TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
  TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
  WEEK: 'GGGG-[W]WW',                             // <input type="week" />
  MONTH: 'MM/YYYY',
  YYYYMMDD: "YYYYMMDD",
  YYYY: "YYYY",
  DDMMYYYYHHMMSS: "DD/MM/YYYY HH:mm:ss",                       // <input type="month" />
  START_DATE: "T00:00:00",
  END_DATE: "T24:00:00",
  DAY_OF_WEEK: 'dddd',

  formatDate: (input: string, patent: string) => {

    let date = moment(input);
    return date.format(patent);
  },
  formatDateFromInputFormat: (input: string, format: string, patent: string) => {
    let date = moment(input, format);
    const dateFormate = date.format(patent)
    return dateFormate !== "Invalid date" ? dateFormate : "";
  },
  getCurrentDate: (parent: string) => {
    return moment().format(parent);
  }
}

export function getArrayDayOfMonth(startDate: string, stopDate: string) {
  var dateArray = [];
  var currentDate = moment(startDate);
  var stopDateMoment = moment(stopDate);
  while (currentDate <= stopDateMoment) {
    dateArray.push({ date: moment(currentDate).format('DD/MM/YYYY'), total_revenue: 0, total_funds: 0 })
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
}
export function getArrayMonthOfYear(startMonth: string, stopMonth: string) {
  var monthArray = [];
  var currentMonth = moment(startMonth);
  var stopMonthMoment = moment(stopMonth);
  while (currentMonth <= stopMonthMoment) {
    monthArray.push({ date: moment(currentMonth).format('MM/YYYY'), total_revenue: 0, total_funds: 0 })
    currentMonth = moment(currentMonth).add(1, 'month');
  }
  return monthArray;
}
export function getArrayYear(startYear: string, stopYear: string) {
  var monthYear = [];
  var currentYear = moment(startYear);
  var stopYearMoment = moment(stopYear);
  while (currentYear <= stopYearMoment) {
    monthYear.push({ date: moment(currentYear).format('YYYY'), total_revenue: 0, total_funds: 0 })
    currentYear = moment(currentYear).add(1, 'year');
  }
  return monthYear;
}
export function getDaysInMonth(month: any, year: any) {
  return new Date(year, month, 0).getDate()
}

export const searchDate = (value: number) => {
  const data = `${moment().add(value, 'months').format("YYYY-MM-DDTHH:mm:ss ")}`
  return data
}

export const restExpDate = (date: string) => {
  let now = moment().unix();
  let then = moment(date).unix();
  return Math.ceil((then - now) / 86400)
}

export const countDayFromTimeToTime = (fromTime: string, toTime: string) => {
  const date1 = moment(fromTime).unix();
  const date2 = moment(toTime).unix();
  return Math.ceil((date2 - date1) / 86400)
}

export const convertExcelDateToJsDate = (date: any) => {
  var utc_days = Math.floor(date - 25569);
  var utc_value = utc_days * 86400;
  var date_info = new Date(utc_value * 1000);
  return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate());
}