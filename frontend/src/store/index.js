// REF https://github.com/rematch/rematch
import { init } from '@rematch/core';
import chat from './models';
import base from './base';

const store = init({
  models: {
    chat,
    base,
  },
});

export default store;
