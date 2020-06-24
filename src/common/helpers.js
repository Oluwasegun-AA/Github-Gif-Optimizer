const getType = type => (type.substring(6) === 'quicktime' ? 'mov' : type.substring(6));
const getSize = size => (size / 10 ** 6).toFixed(2);
const getDuration = duration => {
  const hours = Math.floor(duration / 3600);
  duration %= 3600;
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${hours}:${minutes}:${seconds}`;
};
const getName = name => {
  const trimmedName = name.substring(0, 13);
  return trimmedName === name ? `${trimmedName}${'   '}` : `${trimmedName}...`;
};

export {
  getType,
  getName,
  getSize,
  getDuration
};
