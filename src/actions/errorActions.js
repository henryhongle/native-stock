export const ERRORS = {
  DISMISS_ERROR: 'DISMISS_ERROR'
};

const DEFAULT_TIMEOUT = 3000;
export const dismissError = (timeout = DEFAULT_TIMEOUT) => (dispatch, getState) => {
  setTimeout( () => {
    dispatch({
      type: ERRORS.DISMISS_ERROR
    });
  }, timeout);
}
