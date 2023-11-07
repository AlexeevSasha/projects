const nameRouter = ["auth", "redirect", "payment", "review"];

export const checkRouterRedirect = (path: string) => {
  return !nameRouter.find((el) => {
    const routeMatcher = new RegExp(el.replace(/:[^\s/]+/g, "([\\w-]+)"));
    return routeMatcher.test(path);
  });
};
