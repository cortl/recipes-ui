const timeFunction = async <T>(
  message: string,
  fn: () => Promise<T>,
): Promise<T> => {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();

  // eslint-disable-next-line no-console
  console.log(`Time taken for ${message}: ${end - start}ms`);

  return result;
};

export { timeFunction };
