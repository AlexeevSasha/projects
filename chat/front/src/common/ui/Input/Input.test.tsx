import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "@/common/ui/Input/Input";

describe("input component", () => {
  it("render input ", () => {
    render(<Input data-testid={"input-id"} id={"input-id"} name={"Test"} />);

    const inputEl = screen.getByTestId("input-id");

    expect(inputEl).toBeInTheDocument();
  });
  it("render password input with icon eye ", () => {
    const { container } = render(<Input data-testid={"input-id"} id={"input-id"} name={"Test"} type={"password"} />);

    const inputEl = screen.getByTestId("input-id");

    expect(inputEl).toHaveAttribute("type", "password");
    expect(container.querySelector("svg")).toBeDefined();
  });
  it("render input  change value ", () => {
    render(<Input data-testid={"input-id"} id={"input-id"} name={"Test"} defaultValue={"test-text"} />);

    const inputEl = screen.getByTestId("input-id");

    expect(inputEl).toHaveValue("test-text");

    fireEvent.change(inputEl, { target: { value: "123" } });
    expect(screen.getByDisplayValue("123") === inputEl).toBe(true);
  });
  it("render input with error ", () => {
    render(<Input id={"input-id"} name={"Test"} error={"It is error"} />);
    screen.getByText("It is error");
  });
});
