const isDev = process.env.NODE_ENV === 'development';
const isMobile = !!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i);

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

export default {
  isDev,
  isMobile,
  getRandomNumber,
};
