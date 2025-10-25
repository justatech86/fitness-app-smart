export function getCurrentDayIndex() {
  const today = new Date().getDay();
  if (today === 0 || today === 6) return 0;
  return today - 1;
}
