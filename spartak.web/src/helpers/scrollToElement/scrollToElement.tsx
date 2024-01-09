export const scrollToElement = () => {
  const el = document.getElementById("sendForm");
  el?.scrollIntoView({ behavior: "smooth" });
};
