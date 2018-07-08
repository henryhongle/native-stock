export function prettifyNumber(num) {
  const decIndex = num.indexOf('.');
  if (decIndex !== -1) {
    return num.substring(0, decIndex + 3);
  }
  return num;
};

export function numberWithCommas(x) {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
