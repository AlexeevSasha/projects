export const getObjectFlatter = () => {
  const flatObject = {};

  return function objectToFlat(node: any, parentName = ""): string {
    const queryArgs: string[] = [];

    // Проверяем, является ли node объектом
    if (node instanceof Object) {
      for (const subNodeName in node) {
        if (node[subNodeName] instanceof Object) {
          objectToFlat(node[subNodeName], subNodeName);
        } else {
          const newNodeValue = node[subNodeName];
          const newNodeName = parentName === "" ? subNodeName : parentName + "." + subNodeName;

          if (newNodeValue) {
            flatObject[newNodeName] = newNodeValue;
          }
        }
      }
    }

    // Проходим по плоскому объекту и формируем массив строк запроса
    for (const key in flatObject) {
      // eslint-disable-next-line
      queryArgs.push(key.replace(new RegExp(".[0-9]?[0-9]?[0-9]"), "") + "=" + flatObject[key]);
    }

    return queryArgs.join("&");
  };
};
