import { DateRange } from '../_context/ReservationContext';

export const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function isAlreadyBooked(range: DateRange, datesArr: Date[]) {
  return (
    range.from && range.to && datesArr.some(date => {
      return date >= range.from! && date <= range.to!;
    })
  );
}

export function shouldAdjustCalendarPosition(range: DateRange) {
  if (!range.from || !range.to) return false;
  
  const startMonth = range.from.getMonth();
  const endMonth = range.to.getMonth();
  const startYear = range.from.getFullYear();
  const endYear = range.to.getFullYear();
  
  // Check if range spans multiple months
  const monthDiff = (endYear - startYear) * 12 + (endMonth - startMonth);
  return monthDiff > 1;
}

export function getDaysInMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days: (Date | null)[] = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }
  
  return days;
}

export function isDateInRange(date: Date | null, range: DateRange) {
  if (!date || !range.from || !range.to) return false;
  return date >= range.from && date <= range.to;
}

export function isDateSelected(date: Date | null, range: DateRange) {
  if (!date) return false;
  return (range.from && date.getTime() === range.from.getTime()) ||
         (range.to && date.getTime() === range.to.getTime());
}

export function isStartDate(date: Date | null, range: DateRange) {
  if (!date || !range.from) return false;
  return date.getTime() === range.from.getTime();
}

export function isEndDate(date: Date | null, range: DateRange) {
  if (!date || !range.to) return false;
  return date.getTime() === range.to.getTime();
}

export function isDateBooked(date: Date | null, bookedDates: Date[]) {
  if (!date) return false;
  return bookedDates.some(bookedDate => {
    // Normalize both dates to midnight in local timezone for comparison
    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const normalizedBookedDate = new Date(bookedDate.getFullYear(), bookedDate.getMonth(), bookedDate.getDate());
    return normalizedDate.getTime() === normalizedBookedDate.getTime();
  });
}

export function wouldRangeIncludeBookedDates(startDate: Date, endDate: Date, bookedDates: Date[]) {
  const start = startDate < endDate ? startDate : endDate;
  const end = startDate < endDate ? endDate : startDate;
  
  return bookedDates.some(bookedDate => {
    const normalizedBookedDate = new Date(bookedDate.getFullYear(), bookedDate.getMonth(), bookedDate.getDate());
    return normalizedBookedDate >= start && normalizedBookedDate <= end;
  });
}

export function isDateDisabled(date: Date | null) {
  if (!date) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}
