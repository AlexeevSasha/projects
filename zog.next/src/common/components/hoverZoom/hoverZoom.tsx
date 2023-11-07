import { useResize } from "../../hooks/useResize";
import styles from "./HoverZoom.module.css";

interface IProps {
  img: string;
  top: number;
  left: number;
}

export const HoverZoom = (props: IProps) => {
  const { width, height } = useResize();

  return props.img ? (
    <div
      className={styles.container}
      style={
        width / 2 > props.left
          ? height / 2 > props.top
            ? { left: props.left, top: props.top + 20 }
            : { left: props.left, bottom: height - props.top + 20 }
          : height / 2 > props.top
          ? { right: width - props.left, top: props.top + 20 }
          : { right: width - props.left, bottom: height - props.top + 20 }
      }
    >
      <img src={`/trees/${props.img}`} alt={props.img.split(".")[0]} className={styles.image} />
    </div>
  ) : null;
};
