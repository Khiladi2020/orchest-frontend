export const wrapNumber = (min, max, index) => {
  if (min == max) {
    return min;
  }

  const rangeSize = max - min;
  return ((((index - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
