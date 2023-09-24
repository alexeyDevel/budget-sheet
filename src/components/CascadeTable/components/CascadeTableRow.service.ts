export function formatNumber(numberString: string | number) {
  const parts = numberString.toString().split('.');
  let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const decimalPart = parts[1] || '';

  if (integerPart === '') {
    integerPart = '0';
  }

  return `${integerPart}${decimalPart.length > 0 ? `.${decimalPart}` : ''}`;
}
