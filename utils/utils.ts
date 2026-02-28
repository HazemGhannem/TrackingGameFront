export function strengthLabel(password: string): {
  label: string;
  color: string;
  width: string;
} {
  const length = password.length;

  if (length === 0) return { label: '', color: '', width: '0%' };
  if (length < 6) return { label: 'Weak', color: '#FF3B5C', width: '25%' };
  if (length < 8) return { label: 'Fair', color: '#FFB300', width: '50%' };
  if (length < 12) return { label: 'Good', color: '#00E5FF', width: '75%' };
  return { label: 'Strong', color: '#00E676', width: '100%' };
}
