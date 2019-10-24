const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export const count = {
  // initial state
  state: 0,
  reducers: {
    // handle state changes with pure functions
    increment(state, payload) {
      return state + payload;
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      await delay(1000);
      dispatch.count.increment(payload);
    },
  }),
};
