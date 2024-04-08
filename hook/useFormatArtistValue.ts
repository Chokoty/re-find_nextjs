export const formatArtistValue = (value: number) => {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
    // return value.toLocaleString();
  }
  return value;
};
