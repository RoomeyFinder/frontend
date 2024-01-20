import moment from "moment"


const THIRTY_DAY_MONTHS = [3, 5, 8, 10]

export function getCountOfDaysInMonthBasedOnYear(month: number, year: number){
  if(month === 1){
    if((year % 4)) return 28
    else return 29
  }else if(THIRTY_DAY_MONTHS.includes(month)) return 30
  else return 31
}

export function getMonthsAndDatesOfYear(year: number){
  moment.locale("en")
  const months = moment.monthsShort()
  return months.reduce((acc, curr, idx) => {
    return {
      ...acc,
      [curr]: getCountOfDaysInMonthBasedOnYear(idx, year)
    }
  }, {})
}

export function generateYearsListBetweenYears(startYear: number, endYear: number){
  const years = []
  if(startYear >= endYear) return [startYear]
  do{
    years.push(startYear)
    startYear++
  }while(startYear < endYear)
  return years
}
