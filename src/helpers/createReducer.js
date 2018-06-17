export default (initialState, handlers) => (
  (state = initialState, action) => handlers.reduce(
    (latestState, handler) => handler(latestState, action) || latestState,
    state
  )
);
