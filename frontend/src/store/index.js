// REF https://github.com/rematch/rematch
import { init } from '@rematch/core';
import base from './base';
import room from './room';

const store = init({
  models: {
    base,
    room,
  },
});

export default store;
