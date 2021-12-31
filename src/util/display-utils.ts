export function format(value: number, decimals: number): string {
  if (decimals === 0) {
    return Math.floor(value).toString();
  }

  // force additional digits in case of a small integer
  const numberStr = value.toPrecision(value.toString().length + decimals).toString();

  return decimals === 0
    ? numberStr.slice(0, numberStr.indexOf('.'))
    : numberStr.slice(0, numberStr.indexOf('.') + decimals + 1);
}
