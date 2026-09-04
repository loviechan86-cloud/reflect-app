export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function toDateInputValue(date: Date | null | undefined) {
  if (!date) return "";
  return date.toISOString().slice(0, 10);
}
