import { MonthYear } from '.'

export const getDaysInMonth = (
  { year, month }: MonthYear,
  hasWeekends = true,
): Date[] => {
  const daysInMonth: Date[] = []
  const startDate = new Date(year, month - 1, 1) // month is zero-based in JavaScript

  while (startDate.getMonth() === month - 1) {
    if (hasWeekends || (!hasWeekends && !isWeekend(startDate))) {
      daysInMonth.push(new Date(startDate))
    }
    startDate.setDate(startDate.getDate() + 1)
  }

  return daysInMonth
}

export const getYearAndMonth = (date = new Date()): MonthYear => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Months are zero-based, so we add 1

  return { year, month }
}

export const formatDate = (date: Date): string => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const day = date.getDate()
  const suffix = getNumberSuffix(day)
  const formattedDate = `${daysOfWeek[date.getDay()]} ${day}${suffix}`

  return formattedDate
}

export const getDayMonth = (date: Date): string => {
  const day = date.getDate()
  let suffix = 'th'

  if (day === 1 || day === 21 || day === 31) {
    suffix = 'st'
  } else if (day === 2 || day === 22) {
    suffix = 'nd'
  } else if (day === 3 || day === 23) {
    suffix = 'rd'
  }

  const month = date.toLocaleString('default', { month: 'short' })

  return `${day}${suffix} ${month}`
}

export const getNumberSuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return 'th'
  }

  const lastDigit = day % 10
  switch (lastDigit) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export const addDays = (date: Date, days: number): Date => {
  const currentDate = new Date(date)
  const newDate = new Date(currentDate)
  newDate.setDate(currentDate.getDate() + days)
  return newDate
}

export const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
  const datesInRange: Date[] = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    datesInRange.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return datesInRange
}

export const formatMonthYear = ({ month, year }: MonthYear) => {
  const formattedDate = new Date(year, month - 1).toLocaleString('en-GB', {
    month: 'long',
    year: 'numeric',
  })

  const [formattedMonth, formattedYear] = formattedDate.split(' ')

  return `${formattedMonth}/${formattedYear}`
}

export const isWeekend = (date: Date): boolean => {
  const dayOfWeek = date.getDay() // 0 (Sunday) to 6 (Saturday)
  return dayOfWeek === 0 || dayOfWeek === 6
}
