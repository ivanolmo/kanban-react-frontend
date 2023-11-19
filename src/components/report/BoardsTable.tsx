import { useMemo, useState } from "react";

import TableScrollContainer from "~/components/report/TableScrollContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/report/components";
import type { TransformedData } from "~/utils/transformDataForReport";

type SortField = keyof TransformedData[0] | null;

export type SortState = {
  field: SortField;
  order: "asc" | "desc";
};

type BoardsTableProps = {
  data: TransformedData;
  handleClick: () => void;
};

const BoardsTable: React.FC<BoardsTableProps> = ({ data, handleClick }) => {
  const [sortState, setSortState] = useState<SortState>({
    field: null,
    order: "asc",
  });

  const sortedData = useMemo(() => {
    if (!sortState.field) return data;

    return [...data].sort((a, b) => {
      const field = sortState.field!;

      if (a[field] < b[field]) {
        return sortState.order === "asc" ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return sortState.order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortState]);

  const handleSort = <K extends keyof TransformedData[0]>(field: K) => {
    setSortState((prevState) => ({
      field,
      order:
        prevState.field === field && prevState.order === "asc" ? "desc" : "asc",
    }));
  };

  const columnHeaders: {
    label: string;
    sortField: keyof TransformedData[0];
  }[] = [
    { label: "Column", sortField: "columnName" },
    { label: "Task", sortField: "taskTitle" },
    { label: "Task Description", sortField: "taskDescription" },
    { label: "Subtask", sortField: "subtaskTitle" },
    { label: "Subtask Status", sortField: "subtaskCompleted" },
    { label: "Subtask Updated", sortField: "subtaskUpdatedAt" },
  ];

  return sortedData && sortedData.length > 0 ? (
    <TableScrollContainer>
      <Table>
        <TableHeader>
          <TableRow>
            {columnHeaders.map(({ label, sortField }) => (
              <TableHead
                key={sortField}
                isSorted={sortState.field === sortField}
                sortState={sortState}
                onClick={() => handleSort(sortField)}
              >
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData?.map((data, index) => (
            <TableRow key={index} onClick={handleClick}>
              <TableCell>{data.columnName}</TableCell>
              <TableCell tooltip={data.taskTitle}>{data.taskTitle}</TableCell>
              <TableCell tooltip={data.taskDescription}>
                {data.taskDescription}
              </TableCell>
              <TableCell tooltip={data.subtaskTitle}>
                {data.subtaskTitle}
              </TableCell>
              <TableCell data-subtask-completed={data.subtaskCompleted}>
                {data.subtaskCompleted ? "Completed" : "Incomplete"}
              </TableCell>
              <TableCell>{data.subtaskUpdatedAt.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableScrollContainer>
  ) : (
    <div className="mt-24 flex justify-center">
      <p>Select a board to generate a report!</p>
    </div>
  );
};

export default BoardsTable;
