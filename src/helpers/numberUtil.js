export function prettifyNumber(num) {
  if (num === null || num === undefined) {
    return 0;
  }

  const data = num.toString();
  const decIndex = data.indexOf('.');
  if (decIndex !== -1) {
    return data.substring(0, decIndex + 3);
  }
  return data;
}

export function numberWithCommas(x) {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
