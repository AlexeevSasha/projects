import { fireEvent, render, screen } from "@testing-library/react";
import { Drawer } from "@/modules/popup/components/drawer/Drawer";
import styles from "./drawer.module.scss";

describe("Drawer", () => {
  test("render drawer", () => {
    render(
      <Drawer id={"test"} position={"left"}>
        <div>test drawer</div>
      </Drawer>,
    );
    expect(screen.getByText("test drawer")).toBeInTheDocument();
  });
  test("close drawer", async () => {
    render(
      <Drawer id={"test"} position={"left"}>
        <div>test drawer</div>
      </Drawer>,
    );
    const element = screen.getByTestId("close-drawer");
    fireEvent.click(element);

    expect(element).toHaveClass(styles.backdropClose);
  });
});
