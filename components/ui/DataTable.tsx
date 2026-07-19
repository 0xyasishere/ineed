"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder?: string;
  searchKey?: string;
  pageSize?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Search...",
  searchKey,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize,
      },
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="space-y-4">
      {searchKey && (
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
              onChange={(e) =>
                table.getColumn(searchKey)?.setFilterValue(e.target.value)
              }
              className="w-full manga-outline bg-white px-4 py-2.5 text-sm font-medium text-foreground placeholder-foreground/40 outline-none focus:border-primary focus:shadow-[4px_4px_0_var(--color-primary)] transition-all duration-200"
            />
          </div>
        </div>
      )}

      <div className="manga-panel bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b-[3px] border-foreground bg-muted/30">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-manga tracking-wide text-foreground/70"
                    >
                      {header.isPlaceholder ? null : (
                        <button
                          className={`flex items-center gap-1 cursor-pointer select-none ${
                            header.column.getCanSort() ? "hover:text-primary" : ""
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <span className="inline-flex flex-col">
                              {header.column.getIsSorted() === "asc" ? (
                                <ChevronUpIcon size={12} className="text-primary" />
                              ) : header.column.getIsSorted() === "desc" ? (
                                <ChevronDownIcon size={12} className="text-primary" />
                              ) : (
                                <ChevronUpIcon size={12} className="text-foreground/30" />
                              )}
                            </span>
                          )}
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-foreground/10 last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-sm font-medium text-foreground">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center text-sm text-foreground/40"
                  >
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t-2 border-foreground/10">
          <p className="text-xs font-bold text-foreground/50">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length} entries
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1.5 manga-outline-sm bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted transition-colors cursor-pointer"
            >
              <ChevronLeftIcon size={14} />
            </button>
            {table.getPageOptions().map((page) => (
              <button
                key={page}
                onClick={() => table.setPageIndex(page)}
                className={`w-8 h-8 manga-outline-sm text-xs font-bold cursor-pointer transition-all duration-200 ${
                  table.getState().pagination.pageIndex === page
                    ? "bg-primary text-white shadow-[2px_2px_0_var(--color-primary)]"
                    : "bg-white hover:bg-muted"
                }`}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1.5 manga-outline-sm bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted transition-colors cursor-pointer"
            >
              <ChevronRightIcon size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
