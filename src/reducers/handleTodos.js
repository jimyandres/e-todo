const checked = (state, action, visibility) => {
  const { completed } = action.json.task;

  const shouldRemove = (
    (completed && visibility === 'pending') ||
    (!completed && visibility === 'completed')
  );

  return shouldRemove
    ? state.filter(id => id !== _id)
    : state;
};

export { checked };
