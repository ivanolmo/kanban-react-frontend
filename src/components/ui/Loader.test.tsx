import Loader from "~/components/ui/Loader";
import { renderWithProviders } from "~/utils/testUtils";

describe("Loader", () => {
  test("renders the loader", () => {
    const { getByTestId } = renderWithProviders(<Loader />);

    expect(getByTestId("loader-container")).toBeInTheDocument();
  });

  test("renders the message when provided", () => {
    const { getByText } = renderWithProviders(<Loader message="Loading..." />);

    expect(getByText("Loading...")).toBeInTheDocument();
  });
});
