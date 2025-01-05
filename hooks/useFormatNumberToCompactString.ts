export const formatNumberToEnglishUnit = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
    // return value.toLocaleString();
  }
  return value;
};

export const getFormattedNumber = (value: number): number => {
  if (value >= 10000) {
    return parseFloat((value / 10000).toFixed(1));
  }
  if (value >= 1000) {
    return parseFloat((value / 1000).toFixed(1));
  }
  return value;
};

export const getUnit = (value: number): string => {
  if (value >= 10000) return '만';
  if (value >= 1000) return '천';
  return '';
};
