"use client";


import { useState, useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DownloadIcon,
  FilterIcon,
} from "@/Icons/dashboardIcons/dashboardIcons";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  showSearch?: boolean;
  showPagination?: boolean;
  showExport?: boolean;
  showFilters?: boolean;
  isSelectable?: boolean;
  onFilterClick?: any;
  setFiltersOpen?: any;
  ColumnClassName?: any;
  rowClassName?: any;
  paginationClassName?: any;
  filterContent?: React.ReactNode;
}


export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  showSearch,
  showPagination = true,
  showExport,
  showFilters,
  isSelectable = false,
  onFilterClick,
  setFiltersOpen,
  ColumnClassName = "",
  rowClassName = "",
  filterContent,
  paginationClassName,
}: DataTableProps<TData, TValue>) {
  // ===== CUSTOM PAGINATION STATE =====
  const path = usePathname();
  // console.log(path );
  // console.log(path === "/customer/active-loans");


  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  // const [sorting, setSorting] = useState([]);
  const [sorting, setSorting] = useState<SortingState>([]);


  // Reset to page 0 when filter changes
  const handleFilterChange = (value: string) => {
    setGlobalFilter(value);
    setPageIndex(0);
  };


  // TanStack table WITHOUT pagination plugin
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),


    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    globalFilterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      const searchLower = filterValue.toLowerCase();
      const searchableValue = searchKey
        ? String(row.getValue(searchKey) ?? "").toLowerCase()
        : row
            .getVisibleCells()
            .map((cell) => String(cell.getValue() ?? ""))
            .join(" ")
            .toLowerCase();
      return searchableValue.includes(searchLower);
    },
  });


  // Get ALL filtered AND sorted rows (not paginated)
  const allFilteredRows = table.getSortedRowModel().rows;
  const totalRows = allFilteredRows.length;


  const allRowsSelected =
    allFilteredRows.length > 0 &&
    allFilteredRows.every((row) => rowSelection[row.id]);
  const someRowsSelected =
    !allRowsSelected && allFilteredRows.some((row) => rowSelection[row.id]);


  const toggleRowSelection = (rowId: string) => {
    setRowSelection((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };


  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked) {
      const allSelected = allFilteredRows.reduce(
        (acc, row) => ({ ...acc, [row.id]: true }),
        {} as Record<string, boolean>,
      );
      setRowSelection(allSelected);
      return;
    }


    setRowSelection({});
  };


  // ===== CUSTOM PAGINATION LOGIC =====
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));


  // Clamp pageIndex if it exceeds totalPages
  const safePageIndex = Math.min(pageIndex, totalPages - 1);


  // Slice rows for current page
  const paginatedRows = useMemo(() => {
    const start = safePageIndex * pageSize;
    const end = start + pageSize;
    return allFilteredRows.slice(start, end);
  }, [allFilteredRows, safePageIndex, pageSize]);


  // Sync pageIndex if it went out of bounds
  if (pageIndex !== safePageIndex) {
    setPageIndex(safePageIndex);
  }


  // Calculate entry range text
  const startEntry = totalRows === 0 ? 0 : safePageIndex * pageSize + 1;
  const endEntry = Math.min((safePageIndex + 1) * pageSize, totalRows);


  // Handle page size change
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(0);
  };


  // ===== PAGINATION BUTTONS LOGIC =====
  const getPageNumbers = () => {
    const current = safePageIndex;
    const total = totalPages;
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | null = null;


    for (let i = 0; i < total; i++) {
      if (
        i === 0 ||
        i === total - 1 ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }


    range.forEach((i) => {
      if (l !== null) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });


    return rangeWithDots;
  };


  return (
    <div className=" rounded-[25px] bg-myWhite  ">
      {/* ===== TOOLBAR ===== */}
      {path === "/customer/active-loans" && (
        <div className="bg-[#F8FAFC] p-4 -mb-2 ">
          <h2
            className="font-semibold text-myBluishColor text-2xl
         font-inter"
          >
            Collections Queue
          </h2>
          <p className="font-inter text-lg text-[#565E74] font-medium  ">
            Prioritized cases requiring immediate attention
          </p>
        </div>
      )}
      <div className="flex items-center justify-between p-2 bg-[#F8FAFC] px-4 ">
        {/* LEFT - Entries selector */}


        <div className="flex items-center gap-2 font-inter font-semibold text-sm text-[#464554]">
          show
          <select
            className="border rounded-md h-6 px-0.5 text-sm"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          >
            {[10, 20, 30].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <p className="text-sm text-[#464554] font-semibold ">entries </p>
        </div>


        {/* RIGHT - Search & Export */}
        <div className="flex items-center gap-3 ">
          {showSearch && (
            <Input
              placeholder={
                searchKey ? `Search by ${searchKey}...` : "Search..."
              }
              className="w-[250px]"
              value={globalFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
            />
          )}


          {/* {showFilters && (
            // <button onClick={onFilterClick}>
            <button onClick={() => setFiltersOpen((prev: boolean) => !prev)} className="flex items-center gap-2 text-myBluishColor text-xs border border-[#C7C4D7] font-sora! px-4 py-2 rounded-md bg-myWhite cursor-pointer hover:bg-mauve-100  " >


              <FilterIcon className="h-4 w-4" />
              Filter
            </button>
          )} */}
          {showFilters && filterContent && (
            <Popover>
              <PopoverTrigger
                asChild
                className="flex items-center gap-2 text-myBluishColor text-xs border border-[#C7C4D7] font-sora! px-4 py-2 rounded-md bg-myWhite cursor-pointer hover:bg-mauve-100 "
              >
                <button>
                  <FilterIcon className="h-4 w-4" />
                  Filter
                </button>
              </PopoverTrigger>


              <PopoverContent
                align="end"
                className="bg-transparent! outline-0! border-none! shadow-none!   p-0"
              >
                {filterContent}
              </PopoverContent>
            </Popover>
          )}


          {showExport && (
            <button className="flex items-center font-sora! gap-2 text-myBluishColor text-xs border border-[#C7C4D7] px-4 py-2 rounded-md bg-myWhite cursor-pointer hover:bg-mauve-100  ">
              <DownloadIcon className="h-4 w-4" />
              Export CSV
            </button>
          )}
        </div>
      </div>


      {/* ===== TABLE ===== */}
      <div className="w-full overflow-x-auto">
        {/* <Table className="min-w-[1200px] "> */}
        <Table className=" ">
          <TableHeader className="font-inter font-semibold text-lg text-myBluishColor     ">
            {table.getHeaderGroups().map((headerGroup, headerGroupIndex) => (
              <TableRow key={headerGroup.id} className={ColumnClassName}>
                {isSelectable && headerGroupIndex === 0 && (
                  <TableHead className="max-w-12 h-16">
                    <Checkbox
                      checked={
                        allRowsSelected
                          ? true
                          : someRowsSelected
                            ? "indeterminate"
                            : false
                      }
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all rows "
                      className="border border-[#C5C6CD]  data-checked:bg-myRed data-checked:border-myRed "
                    />
                  </TableHead>
                )}
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="max-w-12  h-16    ">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="capitalize font-inter text-sm lg:text-base  ">
            {paginatedRows.length ? (
              paginatedRows.map((row) => {
                const statusColumn = row
                  .getAllCells()
                  .find((cell) => cell.column.id === "status");


                const status = statusColumn?.getValue();
                // const status = row?.getValue("status");
                const isActiveLoanPage = path.startsWith(
                  "/customer/active-loans/",
                );
                const isDocumentVarificationPage = path.startsWith(
                  "/customer/settings/documents-and-verification",
                );
                const rowClassDocument = isDocumentVarificationPage
                  ? status === "expired"
                    ? "bg-[#BA1A1A0D] hover:bg-red-100/50 border border-[#C7C4D7]"
                    : ""
                  : "";


                const rowClass = isActiveLoanPage
                  ? status === "closed"
                    ? "bg-[#E63A2E1A] hover:bg-red-100/50"
                    : "bg-[#BEE9DF] hover:bg-[#BEE9DF]/55"
                  : "";


                return (
                  <TableRow
                    key={row.id}
                    data-state={rowSelection[row.id] ? "selected" : undefined}
                    className={`border-0  ${rowClass} ${rowClassDocument}`}
                  >
                    {isSelectable && (
                      <TableCell className="max-w-12 h-16 pr-0">
                        <Checkbox
                          checked={!!rowSelection[row.id]}
                          onCheckedChange={() => toggleRowSelection(row.id)}
                          aria-label={`Select row ${row.id}`}
                          className="border border-[#C5C6CD]  data-checked:bg-myRed data-checked:border-myRed "
                        />
                      </TableCell>
                    )}
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={` max-w-12  h-16 text-wrap!   font-sora ${isActiveLoanPage && "text-[#064E3B] font-bold"} ${rowClassName} `}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                {isSelectable && <TableCell className="h-24" />}
                <TableCell
                  colSpan={isSelectable ? columns.length + 1 : columns.length}
                  className="h-24 text-center "
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {/* <TableBody className="capitalize font-inter  text-sm lg:text-base">
            {paginatedRows.length ? (
              paginatedRows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-0  "
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center  "
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody> */}
        </Table>
      </div>


      {/* ===== CUSTOM PAGINATION ===== */}
      {/* {showPagination && totalPages > 1 && ( */}
      {showPagination && (
        <div
          className={`flex items-center justify-between p-4 border-t bg-[#F8FAFC]  ${paginationClassName} `}
        >
          {/* Entries info */}
          <div className="text-sm text-muted-foreground">
            Showing <strong>{startEntry}</strong> to <strong>{endEntry}</strong>{" "}
            of <strong>{totalRows}</strong> entries
          </div>


          {/* Page buttons */}
          <div className="flex items-center gap-2">
            {/* Previous */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageIndex(safePageIndex - 1)}
              disabled={safePageIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>


            {/* Page numbers */}
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span
                  key={`dots-${index}`}
                  className="px-2 text-sm text-muted-foreground"
                >
                  ...
                </span>
              ) : (
                <Button
                  key={page}
                  variant={safePageIndex === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPageIndex(page as number)}
                  className={`min-w-[40px] ${
                    safePageIndex === page
                      ? "bg-myRed hover:bg-red-700 text-white border-red-600"
                      : ""
                  }`}
                >
                  {(page as number) + 1}
                </Button>
              ),
            )}


            {/* Next */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageIndex(safePageIndex + 1)}
              disabled={safePageIndex >= totalPages - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
