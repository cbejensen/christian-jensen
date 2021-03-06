export function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min // Max and min are inclusive
}

export function getExponentialInt(int, max) {
  return Math.floor(Math.sqrt(Math.pow(max, 2) - Math.pow(int, 2)))
}

export function createZIndexes(elementNames) {
  let zIndex = 1
  return elementNames.reduceRight((acc, curr) => {
    acc[curr] = zIndex++
    return acc
  }, {})
}
