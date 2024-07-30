import { searchFile } from "../constants/mdFiles";
import { DataNode } from "antd/lib/tree";

interface IFile {
  id: string;
  file?: string;
  title: string;
  order: number;
  found?: string;
  children?: IFile[];
}

const generateId = () => Math.floor(Math.random() * 1000).toString(32) + Math.random().toString(36).slice(5);
const requireMD = (name: string) => require("../../assets/docs/" + name);
const replaceMd = (str: string) => str.replace(".md", "");
const regexp = /.jpe?g|png$/i;

const addChild = (arrFile: string[], arr: IFile[], path: string) => {
  const pathFile = path ? path + "/" : path;
  // eslint-disable-next-line @typescript-eslint/no-for-in-array,guard-for-in
  for (const item in arrFile) {
    const value = arrFile[item];
    const prevName = arr.find((elem) => arrFile[+item - 1] === elem.found);
    const existsFound = arr.find((elem) => value === elem.found);
    if (value === "images" || regexp.test(value)) {
      continue;
    }
    if (!value.includes(".md")) {
      if (prevName && prevName.children) {
        addChild(arrFile.slice(+item), prevName.children, pathFile + arrFile.slice(0, +item).join("/"));
        break;
      } else {
        !existsFound && addFound(value, arr);
      }
    } else {
      prevName && prevName.children && addFile(pathFile + arrFile.join("/"), prevName.children);
    }
  }
};

const addFile = (file: string, arr: IFile[]) => {
  const nameFile = replaceMd(file.split("/").slice(-1).join(""));
  const { name, order } = searchFile(nameFile);
  arr.push({
    id: generateId(),
    file: requireMD(file).default,
    title: name || nameFile,
    order
  });
};

const addFound = (value: string, arr: IFile[]) => {
  const nameFile = replaceMd(value);
  const { name, order } = searchFile(nameFile);
  arr.push({
    id: generateId(),
    found: nameFile,
    children: [],
    title: name || nameFile,
    order
  });
};

const importAll = (md: any): IFile[] => {
  const filesMD: IFile[] = [];
  if (!md.keys().length) {
    return filesMD;
  }
  md.keys().forEach((elem: string) => {
    const countFilesArr = elem.replace(".", "").split("/").filter((el) => el);
    if (countFilesArr.length === 1) {
      addFile(countFilesArr[0], filesMD);
    } else {
      addChild(countFilesArr, filesMD, "");
    }
  });

  return filesMD;
};

export const getAllMD = importAll(
  //@ts-ignore
  require.context("../../assets/docs")
);

const antTreeMDFiles: any = (getAll: IFile[]) => {
  return getAll.map((elem) => {
      if (elem.children) {
        return { ...elem, key: elem.id,
          children: elem.children.map((child) => {
              return child.children
                ? { ...child, key: child.id, children: antTreeMDFiles(child.children) }
                : { ...child, key: child.id, isLeaf: true };
            }).sort((a, b) => a.order - b.order)
        };
      } else {
        return { ...elem, key: elem.id, isLeaf: true };
      }
    }).sort((a, b) => a.order - b.order);
};

export const getTreeMDFiles: DataNode[] = antTreeMDFiles(getAllMD);
