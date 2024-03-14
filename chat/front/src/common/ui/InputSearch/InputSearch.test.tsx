import { fireEvent, render, screen } from "@testing-library/react";
import { InputSearch } from "@/common/ui/InputSearch/InputSearch";

describe("input Search component", () => {
  it("render input search ", () => {
    render(<InputSearch data-testid={"input-id"} id={"input-id"} />);

    const inputEl = screen.getByTestId("input-id");

    expect(inputEl).toBeInTheDocument();
  });
  it("render input  search value ", () => {
    render(<InputSearch data-testid={"input-id"} id={"input-id"} />);

    const inputEl = screen.getByTestId("input-id");

    expect(inputEl).toHaveValue("");

    fireEvent.change(inputEl, { target: { value: "search-text" } });
    expect(screen.getByDisplayValue("search-text") === inputEl).toBe(true);
  });
});
