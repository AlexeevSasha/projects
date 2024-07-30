import { useState } from "react";
import { Layout, Tree } from "antd";
import { getAllMD, getTreeMDFiles } from "../../common/helpers/getAllMd";
import type { DirectoryTreeProps } from "antd/lib/tree";
import { OneMd } from "./components/OneMd";

const { Content, Sider } = Layout;
const { DirectoryTree } = Tree;

export const Help: React.FC = () => {
  const [data, setData] = useState<any>("");

  const onSelect: DirectoryTreeProps["onSelect"] = (keys) => {
    const getForEacth = (arr: any) => {
      arr.forEach((elem: any) => {
        if (elem.children) {
          return elem.id === keys[0] ? "" : getForEacth(elem.children);
        } else {
          return elem.id === keys[0] ? setData(elem) : "";
        }
      });
    };

    getForEacth(getAllMD);
  };

  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: "white"
        }}
      >
        <div style={{ marginTop: 24 }}>
          <DirectoryTree multiple defaultExpandAll onSelect={onSelect} treeData={getTreeMDFiles} />
        </div>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ margin: "0 16px 0" }}>
          <div style={{ padding: "16px 0", minHeight: "100vh" }}>
              {data && <OneMd file={data.file} name={data.name} />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
