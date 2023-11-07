import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { checkOnlyImg } from "../constants/checkOnlyImg";
import { useSession } from "next-auth/react";
import { Orders } from "../../order/components/order";
import { addImage, changeImage } from "../../../api/order";
import { filesGoogleDrive } from "../../../common/constants/filesGoogleDrive";

export const DiagnoseCarouselImg = () => {
  const { query } = useRouter();
  const [order, setOrder] = useState<any>();
  const { data } = useSession();

  useEffect(() => {
    if (query.id) {
      axios.get(`/api/clients/${query.id}`).then((res) => {
        setOrder(res.data.data);
      });
    }
  }, [query.id]);

  const changeFile = async (file: File, photoId: string, name: string) => {
    await changeImage({ file, photoId, id: String(query.id), photos: order?.photos, name });
    window.location.reload();
  };

  const addFiles = async (files: File[]) => {
    await addImage(files, String(query.id));
    window.location.reload();
  };

  return (
    <div>
      <div className="carousel w-full">
        {data?.user?.userRole === "Admin" && <Orders.AddImageOrder addFiles={addFiles} />}
        {order?.photos?.filter(checkOnlyImg).map((file: string, index: number) => {
          const photo = filesGoogleDrive.getImageByUrl(file);
          return (
            <div key={index} id={`file${index + 1}`} className="carousel-item b mb-3 w-full p-2">
              <div className={"border p-2 hover:border-orange-500"}>
                {data?.user?.userRole === "Admin" && (
                  <div className={"grid grid-cols-2 gap-2"}>
                    <Orders.ChangeImageOrder
                      changeFile={changeFile}
                      photoId={photo.id}
                      name={file}
                    />
                    <Orders.DeleteImageOrder
                      id={query.id as string}
                      photoName={file}
                      photoId={photo.id}
                    />
                  </div>
                )}
                <Image
                  src={photo.url}
                  alt={order.about_photos + "_file_" + index}
                  className="w-full"
                  width={300}
                  height={300}
                  priority={true}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
