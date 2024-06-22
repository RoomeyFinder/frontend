import moment from "moment"

const THIRTY_DAY_MONTHS = [3, 5, 8, 10]

export function getCountOfDaysInMonthBasedOnYear(month: number, year: number) {
  if (month === 1) {
    if (year % 4) return 28
    else return 29
  } else if (THIRTY_DAY_MONTHS.includes(month)) return 30
  else return 31
}

export function getMonthsAndDatesOfYear(year: number) {
  moment.locale("en")
  const months = moment.monthsShort()
  return months.reduce((acc, curr, idx) => {
    return {
      ...acc,
      [curr]: getCountOfDaysInMonthBasedOnYear(idx, year),
    }
  }, {})
}

export function generateYearsListBetweenYears(
  startYear: number,
  endYear: number
) {
  const years = []
  if (startYear >= endYear) return [startYear]
  do {
    years.push(startYear)
    startYear++
  } while (startYear < endYear)
  return years
}

export function timeAgo(date: Date) {
  const diff = Date.now() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 1) {
    if (days > 365) return `${Math.round(days / 365)}yrs`
    else if (days === 365) return "1yr"
    if (days < 7) return `${days}d`
    else if (days === 7) return "1wk"
    else return `${Math.round(days / 7)}wks`
  } else if (days === 1) {
    return "1d"
  } else if (hours > 0) {
    return `${hours}hr${hours !== 1 ? "s" : ""}`
  } else if (minutes > 0) {
    return `${minutes}m`
  } else if (seconds > 0) {
    return `${seconds}s`
  } else return "Just now"
}

export function getAgeInYears(dob: Date) {
  return new Date(Date.now()).getFullYear() - dob.getFullYear()
}
