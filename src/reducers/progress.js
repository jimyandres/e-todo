const initialState = 0;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_PROGRESS': {
      return state + 1;
    }
    case 'DECREMENT_PROGRESS': {
      // Don't go lower than zero
      return Math.max(state - 1, 0);
    }
    default: {
      return state;
    }
  }
};

export default reducer;
