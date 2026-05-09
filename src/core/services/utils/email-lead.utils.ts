export function formatPhoneDisplay(digits: string): string {
  const d = digits.replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('7')) {
    const r = d.slice(1);
    return `+7 (${r.slice(0, 3)}) ${r.slice(3, 6)}-${r.slice(6, 8)}-${r.slice(8, 10)}`;
  }
  return digits;
}
