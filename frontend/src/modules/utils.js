const isDev = process.env.NODE_ENV === 'development';
const isMobile = !!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i);

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

/**
 * UUID를 생성 후 반환합니다.
 */
const getUUID = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
};

/**
 * 딜레이 처리
 * @param {*} time
 */
const delay = (time) => {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
};

export default {
  isDev,
  isMobile,
  getRandomNumber,
  getUUID,
  delay,
};
