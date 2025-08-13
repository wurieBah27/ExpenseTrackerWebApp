export function getMonthDate(baseDate: Date, monthOffset: number = 0): Date {
  const newDate = new Date(baseDate);
  newDate.setMonth(newDate.getMonth() + monthOffset);
  newDate.setDate(1);
  newDate.setHours(0, 0, 0, 0);

  return newDate;
}
