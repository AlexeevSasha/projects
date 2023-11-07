import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const DiagnoseJsonTable = ({ hide = [], labels = {} }: any) => {
  const { query } = useRouter();
  const [data, setData] = useState<any>();

  const getInfo = async () => {
    if (query.id) {
      axios.get(`/api/clients/${query.id}`).then((res) => {
        setData(res.data.data);
      });
    }
  };

  useEffect(() => {
    getInfo();
  }, [query.id]);

  if (data) {
    const d = Object.entries(data);
    return (
      <div className="overflow-x-auto p-4">
        <table className="table-compact table-zebra table w-full">
          <tbody>
            {d
              .filter(([, v]) => v)
              .filter(([k]) => !hide.includes(k))
              .map(([k, v], index) => (
                <tr key={index}>
                  <th className="border border-gray-300  p-2">{labels[k] ?? k}</th>
                  <td className="border border-gray-300  p-2">{String(v)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <></>;
  }
};
