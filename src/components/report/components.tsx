import clsx from "clsx";
import { forwardRef } from "react";

import type { SortState } from "~/components/report/BoardsTable";
import SortIcon from "~/components/svg/SortIcon";
import SortedIcon from "~/components/svg/SortedIcon";

const Table = forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative mx-auto my-24 w-full max-w-6xl table-fixed overflow-auto rounded-2xl border border-slate/25 p-6 dark:bg-gunmetal-800">
    <table ref={ref} className={clsx("w-full text-md", className)} {...props} />
  </div>
));
Table.displayName = "Table";

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={clsx("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={clsx(className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={clsx(className)} {...props} />
));
TableRow.displayName = "TableRow";

const TableHead = forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    isSorted?: boolean;
    sortState: SortState;
  }
>(({ className, children, isSorted, sortState, ...props }, ref) => (
  <th
    ref={ref}
    className={clsx(
      "group h-12 px-4 text-left align-middle text-md font-bold transition hover:cursor-pointer hover:text-slate dark:text-violet-600 hover:dark:text-violet-400",
      className,
    )}
    {...props}
  >
    <div className="flex items-center justify-center gap-2.5">
      {children}
      {isSorted ? (
        <SortedIcon
          className={clsx(
            "transition group-hover:fill-slate dark:fill-violet-600 dark:group-hover:fill-violet-400",
            sortState.order === "asc" ? "rotate-180" : "",
          )}
        />
      ) : (
        <SortIcon className="transition group-hover:fill-slate dark:fill-violet-600 dark:group-hover:fill-violet-400" />
      )}
    </div>
  </th>
));
TableHead.displayName = "TableHead";

const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & { tooltip?: string }
>(({ className, tooltip, children, ...props }, ref) => (
  <td
    ref={ref}
    className={clsx(
      "group relative max-w-[160px] overflow-hidden truncate p-4 text-center align-middle",
      className,
    )}
    title={tooltip}
    {...props}
  >
    {children}
  </td>
));
TableCell.displayName = "TableCell";

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
