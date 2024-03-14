import { render, screen } from "@testing-library/react";
import { Button } from "@/common/ui/Button/Button";

describe("Button", () => {
  test("render button", () => {
    render(<Button>test</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should render button with text: Click", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click");
  });
});
