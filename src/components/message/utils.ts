export const isToday = (a: Date, b: Date): boolean =>
  a.toLocaleDateString() === b.toLocaleDateString();

export function formatDate(date?: string | number | Date) {
  if (!date) return '';

  const d = new Date(date);
  return isToday(d, new Date())
    ? d.toLocaleTimeString()
    : d.toLocaleDateString();
}
