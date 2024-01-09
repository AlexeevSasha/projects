export const cropImage = (file: File, nextWidth: number, nextHeight: number): Promise<File> =>
  new Promise((resolve, rejected) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const aspectRatio = nextWidth / nextHeight;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => typeof reader.result === "string" && (img.src = reader.result));

    canvas.width = nextWidth;
    canvas.height = nextHeight;

    img.addEventListener("load", () => {
      const currentAspectRatio = img.width / img.height;
      const w = currentAspectRatio < aspectRatio ? img.width : img.height * aspectRatio;
      const h = currentAspectRatio < aspectRatio ? img.width / aspectRatio : img.height;
      const sx = img.width > w ? (img.width - w) / 2 : 0;
      const sy = img.height > h ? (img.height - h) / 2 : 0;
      ctx?.drawImage(img, sx, sy, w, h, 0, 0, nextWidth, nextHeight);

      canvas.toBlob(
        (blob) => {
          blob ? resolve(new File([blob], "name", { type: "image/jpeg" })) : rejected();
        },
        "image/jpeg",
        1
      );
    });
  });
