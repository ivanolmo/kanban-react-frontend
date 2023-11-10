import { useSelector } from "react-redux";
import ScrollContainer from "react-indiana-drag-scroll";
import clsx from "clsx";
import AddColumn from "~/components/column/AddColumn";
import Column from "~/components/column/Column";
import { selectCurrentBoard, selectShowSidebar } from "~/store/selectors";

const ColumnScrollContainer: React.FC = () => {
  const currentBoard = useSelector(selectCurrentBoard);
  const showSidebar = useSelector(selectShowSidebar);

  return (
    <ScrollContainer
      className={clsx(
        "flex gap-6 px-4 py-6 duration-300 ease-in-out md:px-6",
        showSidebar ? "ml-64" : "ml-0",
      )}
      buttons={[0, 1]}
      vertical={true}
    >
      {currentBoard?.columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
      <AddColumn />
    </ScrollContainer>
  );
};

export default ColumnScrollContainer;
