export const selectorGetALlFinances = (store) => {
  const finances = store.financesStore.finances;
  if (finances.length !== 0 && finances.length === 2) {
    return finances[1].map((item, index) => ({
      ...item,
      change:
        +finances[1][index].change - +finances[0][index].change > 0
          ? `+${finances[1][index].change}`
          : `-${finances[1][index].change}`,
    }));
  }
  return finances;
};

export const selectorGetWatchingGroup = (store) =>
  store.financesStore.watchingGroup;
