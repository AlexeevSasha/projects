import { classNames } from "@/common/lib/classNames/classNames";

describe("classNames", () => {
  test("with only class", () => {
    expect(classNames("class")).toBe("class");
  });
  test("with some class", () => {
    const toBe = "class class1 class2";
    expect(classNames(toBe)).toBe(toBe);
  });
  test("with only mod", () => {
    const toBe = "class class1";
    expect(classNames({ class: true, class1: true })).toBe(toBe);
  });
  test("with mods class", () => {
    const toBe = "class class1";
    expect(classNames("class", { class1: true, class2: false })).toBe(toBe);
  });
  test("with mods only false", () => {
    expect(classNames({ class: false })).toBe("");
  });
  test("with additional undefined", () => {
    const toBe = "class class1";
    expect(classNames("class", { class1: true, class2: undefined })).toBe(toBe);
  });
});
