const isDev = process.env.NODE_ENV === 'development';
const isMobile = !!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i);

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

/**
 * 딜레이 처리
 * @param {*} time
 */
const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export default {
  isDev,
  isMobile,
  getRandomNumber,
  delay,
};
