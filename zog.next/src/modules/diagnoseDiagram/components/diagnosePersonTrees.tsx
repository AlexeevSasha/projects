import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TreeType } from "../constants/treesEnum";
import { HoverZoom } from "../../../common/components/hoverZoom/hoverZoom";
import { getLanguage } from "../../../../public/locales/lang";

const trees = Object.entries(TreeType);

export const DiagnosePersonTrees = () => {
  const { data: userDada } = useSession();
  const { query, locale } = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [personalTreesId, setPersonalTreesId] = useState<string>();
  const [hovered, setHovered] = useState({ img: "", left: 0, top: 0 });

  useEffect(() => {
    axios.get(`/api/trees/${query.id}`).then(({ data }) => {
      setPersonalTreesId(data.data.id);
      setSelected(data.data.trees);
    });
  }, []);

  const selectTrees = (treeIds: string[]) => {
    if (userDada?.user?.userRole === "Admin") {
      if (personalTreesId) {
        axios.post("/api/trees/update", {
          id: personalTreesId,
          orderAfterPayId: query.id,
          trees: treeIds,
        });
      } else {
        axios
          .post("/api/trees/create", {
            orderAfterPayId: query.id,
            trees: treeIds,
          })
          .then(({ data }) => setPersonalTreesId(data.data.id));
      }
    }
  };

  const toggle = (key: string) => () => {
    if (userDada?.user?.userRole === "Admin") {
      const newTrees = selected.includes(key)
        ? selected.filter((item) => item !== key)
        : [...selected, key];

      setSelected(newTrees);
      selectTrees(newTrees);
    }
  };

  const handleMouseMove = (img: string) => (e: any) => {
    setHovered({ img, left: e.pageX, top: e.pageY });
  };

  return (
    <div className="p-4">
      <h3 className={"text-xl"}>{getLanguage(locale).table.tree_recommendations}</h3>
      <div className={"flex flex flex-wrap gap-4"}>
        {trees.map(([key, value]) => (
          <div
            key={key}
            title={value ?? ""}
            style={{ width: 100, height: 100 }}
            className={
              selected.includes(key)
                ? "flex items-center justify-center border-2 border-solid border-indigo-600"
                : "flex items-center justify-center"
            }
            onClick={toggle(key)}
          >
            <img
              src={`/trees/${value}`}
              style={{ maxHeight: 96, maxWidth: 96 }}
              alt={value.split(".")[0]}
              onMouseOut={() => setHovered({ img: "", left: 0, top: 0 })}
              onMouseMove={handleMouseMove(value)}
            />
          </div>
        ))}
        <HoverZoom {...hovered} />
      </div>
    </div>
  );
};
