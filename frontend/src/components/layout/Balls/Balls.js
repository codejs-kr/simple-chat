import React from 'react';
import utils from 'helpers/utils';
import './Balls.scss';

const Balls = () => {
  return <>{createBall(13)}</>;
};

const createBall = (count = 8) => {
  const { getRandomNumber } = utils;
  const POS_MIN = -5;
  const POS_MAX = 95;
  let result = [];

  for (let i = 0; i < count; i++) {
    const top = getRandomNumber(POS_MIN, POS_MAX);
    const left = getRandomNumber(POS_MIN, POS_MAX);
    const width = 140;
    const height = getRandomNumber(120, 140);
    const style = { top: `${top}%`, left: `${left}%`, width: `${width}px`, height: `${height}px` };

    result.push(<span className="ball" style={style} />);
  }

  return result;
};

export default Balls;
