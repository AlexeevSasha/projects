import { fireEvent, render, screen } from "@testing-library/react";
import { TextArea } from "@/common/ui/TextArea/TextArea";

describe("textarea component", () => {
  it("render input ", () => {
    render(<TextArea data-testid={"textarea-id"} id={"textarea-id"} name={"textarea"} />);

    const inputEl = screen.getByTestId("textarea-id");

    expect(inputEl).toBeInTheDocument();
  });
  it("render textarea  change value ", () => {
    render(<TextArea data-testid={"textarea-id"} id={"textarea-id"} name={"textarea"} defaultValue={"test-text"} />);

    const inputEl = screen.getByTestId("textarea-id");

    expect(inputEl).toHaveValue("test-text");

    fireEvent.change(inputEl, { target: { value: "new text" } });
    expect(screen.getByDisplayValue("new text") === inputEl).toBe(true);
  });
});
