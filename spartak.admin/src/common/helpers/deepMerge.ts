export const deepMerge = <T>(target: Record<string, any>, source: Record<string, any>): T => {
  const nextSource: Record<string, any> = { ...source };

  Object.keys(source).map((key) => {
    // Если элемент является массивом, то он обрабатывается подругому
    if (Array.isArray(source[key])) {
      const newArr = source[key].map((elem: any, index: number) => {
        return (
          (target[key]?.[index] &&
            target[key][index] instanceof Object &&
            source[key]?.[index] &&
            source[key][index] instanceof Object &&
            deepMerge(target[key][index], source[key][index])) ||
          elem
        );
      });

      return (nextSource[key] = newArr);
    } else {
      return (
        target[key] instanceof Object &&
        source[key] instanceof Object &&
        (nextSource[key] = deepMerge(target[key], source[key]))
      );
    }
  });

  return { ...target, ...nextSource } as T;
};
