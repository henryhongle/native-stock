function prettifyNumber(num) {
  const decIndex = num.indexOf('.');
  if (decIndex !== -1) {
    return num.substring(0, decIndex + 3);
  }
  return num;
}

export default prettifyNumber;
