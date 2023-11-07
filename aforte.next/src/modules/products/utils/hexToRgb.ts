export const hexToRgb = (hex: string, opacity = 1) => {
  if (!hex) return;
  const hexRepl = hex.replace("#", "");
  const rgb = hexRepl.match(new RegExp("(.{" + hexRepl.length / 3 + "})", "g")) as RegExpMatchArray;

  rgb.forEach((v, i) => {
    rgb[i] = String(parseInt(rgb[i].length == 1 ? rgb[i] + rgb[i] : rgb[i], 16));
  });

  return `rgba(${rgb.join(",")}, ${opacity})`;
};
