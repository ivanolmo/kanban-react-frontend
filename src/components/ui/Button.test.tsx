import Button from "~/components/ui/Button";
import { fireEvent, renderWithProviders } from "~/utils/testUtils";

describe("Button", () => {
  test("renders the button with the correct text", () => {
    const { getByText } = renderWithProviders(<Button>Test Button</Button>);
    expect(getByText("Test Button")).toBeInTheDocument();
  });

  test("calls onClick prop when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = renderWithProviders(
      <Button onClick={handleClick}>Click Me</Button>,
    );

    fireEvent.click(getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies the wide class when the wide prop is true", () => {
    const { getByText } = renderWithProviders(
      <Button wide>Wide Button</Button>,
    );
    expect(getByText("Wide Button")).toHaveClass("wide");
  });

  test("applies the disabled attribute when the disabled prop is true", () => {
    const { getByText } = renderWithProviders(
      <Button disabled>Disabled Button</Button>,
    );
    const button = getByText("Disabled Button");
    expect(button).toBeDisabled();
  });

  test("applies the hidden class when the hidden prop is true", () => {
    const { getByText } = renderWithProviders(
      <Button hidden>Hidden Button</Button>,
    );
    expect(getByText("Hidden Button")).toHaveClass("hidden");
  });
});
