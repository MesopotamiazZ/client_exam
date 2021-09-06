export default function toPrecision(value, precision = 2) {
  let tiems = Math.pow(10, precision)
  return (value = ~~(value * tiems) / tiems).toFixed(2)
}
