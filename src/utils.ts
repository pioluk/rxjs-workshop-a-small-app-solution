const start = performance.now();
const getTime = () => {
  const relativeTime = performance.now() - start;
  return relativeTime - (relativeTime % 100);
};

export const log = (...args) => {
  console.log(`t=${getTime()}`, "  ", ...args);
};
