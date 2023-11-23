import Column from "~/components/column/Column";
import { createTestColumn, renderWithProviders } from "~/utils/testUtils";

describe("Column", () => {
  const testColumn = createTestColumn("1");

  test("renders the column component", () => {
    const { getByText } = renderWithProviders(<Column column={testColumn} />);

    const heading = getByText(/Test Column Name/i);

    expect(heading).toBeInTheDocument();
  });

  test("should render the correct number of tasks", () => {
    const { getAllByTestId } = renderWithProviders(
      <Column column={testColumn} />,
    );

    const tasks = getAllByTestId("task");

    expect(tasks).toHaveLength(1);
  });
});
