import produce from 'immer';
import utils from 'helpers/utils';

export default {
  // initial state
  state: {
    count: 0,
    myInfo: {
      id: 'user1',
      nickname: '짱구',
      profileImage:
        'https://lh3.googleusercontent.com/-NWx_E8i2cEE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcyW9Y7YloaN8IvNg58Y_ewM2DRKw.CMID/s32-c/photo.jpg',
      participatingTime: 1572010340059,
    },
  },
  reducers: {
    // handle state changes with pure functions
    increment(state, payload) {
      return produce(state, (draft) => {
        draft.count = state.count + payload;
      });
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      console.log('incrementAsync', payload, rootState);
      await utils.delay(1000);
      dispatch.base.increment(payload);
    },
  }),
};
