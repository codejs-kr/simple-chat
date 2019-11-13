import produce from 'immer';
import utils from 'modules/utils';

export default {
  // initial state
  state: {
    overlay: false,
    myInfo: {
      id: utils.getUUID(),
      nickname: 'JS',
      profileImage:
        'https://lh3.googleusercontent.com/-NWx_E8i2cEE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcyW9Y7YloaN8IvNg58Y_ewM2DRKw.CMID/s80-c/photo.jpg',
      participatingTime: 1572010340059,
    },
  },
  reducers: {
    // handle state changes with pure functions
    updateOverlayState(state, payload) {
      return produce(state, (draft) => {
        draft.overlay = payload;
      });
    },
    updateMyInfo(state, payload) {
      return produce(state, (draft) => {
        draft.myInfo = {
          ...draft.myInfo,
          ...payload,
        };
      });
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
  }),
};
