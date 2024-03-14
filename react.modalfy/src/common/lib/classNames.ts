type ClassNamesT = string | Record<string, boolean>;

export const classNames = (...args: ClassNamesT[]) => {
  const cls: string[] = [];

  args.forEach((el) => {
    if (typeof el === "string") cls.push(el);
    else Object.entries(el).forEach(([key, value]) => value && cls.push(key));
  });

  return cls.join(" ");
};
