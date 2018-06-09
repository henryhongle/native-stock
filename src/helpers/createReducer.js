export default (initialState, handlers) => {
  return (state = initialState, action) => handlers.reduce(
    (latestState, handler) => handler(latestState, action) || latestState,
    state
  );
}
