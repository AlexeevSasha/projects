export const scrollToElem = (id: string) => {
  const elem = document.getElementById(id);
  if (elem) {
    elem?.scrollIntoView({ block: "center", behavior: "smooth" });
  }
};
