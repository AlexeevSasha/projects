import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import * as React from "react";
import { useEffect } from "react";

interface IProps<T> {
  rows?: T[];
  columns: ColumnDef<any, any>[];
  loading?: React.ReactElement | null;
  isLoading?: boolean;
}

export function AppTable<T>({ rows, loading = null, isLoading, columns }: IProps<T>) {
  const [data, setData] = React.useState(rows);

  useEffect(() => {
    setData(rows);
  }, [rows]);

  if (typeof isLoading === "undefined") {
    isLoading = !rows;
  }

  const table = useReactTable({
    data: data ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <>{loading}</>;

  return (
    <table className="w-full text-left text-sm font-light">
      <thead className="border-b font-medium dark:border-neutral-500">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} scope="col" className="px-3 py-4">
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b dark:border-neutral-500">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-3 py-4">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.footer, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}
