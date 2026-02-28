export function rankMeta(lp: number) {
  if (lp >= 900) return { color: '#FFD700', label: 'S+' };
  if (lp >= 700) return { color: '#C0C0C0', label: 'S' };
  if (lp >= 500) return { color: '#CD7F32', label: 'A+' };
  if (lp >= 300) return { color: '#00E5FF', label: 'A' };
  return { color: '#8A94A8', label: 'B' };
}