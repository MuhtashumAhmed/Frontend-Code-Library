"use client";
import { useEffect, useState } from "react";
import { SortingState } from "@tanstack/react-table";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";


import { DataTable } from "@/components/shared/DataTable_CustomPagination";
import LoanApplicationTableFilters from "./LoanApplicationTableFilters";
import { managerLoanApplicationTableColumns } from "@/data/managerDashboard/LoanApplicationData/LoanApplicationData";
import { getLoans } from "@/services/loansApi";
import { getProducts } from "@/services/productsApi";
import { getCurrentSubdomain } from "@/utils/domain";
import { LOAN_STATUS_OPTIONS } from "@/constants/loanStatus";
import { MyErrors } from "@/error/MyErrors";
import { useSocketMessages } from "@/hooks/useSocketMessages";


type ManagerLoanRow = {
  id: string;
  customer: string;
  product: string;
  status: string;
  status_label: string;
  ibv: boolean;
  amount: number;
  date_applied: string;
};


// Maps a sortable column id to the backend `ordering` field.
const SORT_FIELD_MAP: Record<string, string> = {
  id: "id",
  customer: "customer__first_name",
  product: "product__name",
  status: "status",
  amount: "effective_amount",
  date_applied: "created_at",
};


const LoanApplicationTable = () => {
  // ------ socket data -------
  const messages = useSocketMessages();
  console.log("socket Data from Laon application table page", messages);
  const normalizeLoan = (item: any): ManagerLoanRow => {
    return {
      id: String(item.id),
      customer: item.customer_name ?? "—",
      product: item.product_name ?? "—",
      status: item.status,
      status_label: item.status_label,
      ibv: item.ibv,
      amount: Number(item.approved_amount ?? item.requested_amount ?? 0),
      date_applied: new Date(item.created_at).toLocaleString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };
  useEffect(() => {
    if (!messages?.length) return;


    const latest = messages[messages.length - 1];


    const loan = latest?.loan;
    if (!loan) return;


    setRows((prev) => {
      const normalized = normalizeLoan(loan);


      const index = prev.findIndex((r) => r.id === normalized.id);
      console.log("socket se id: ", index);
      // CREATE → add
      if (latest?.event === "loan.created") {
        if (index !== -1) return prev;
        return [normalized, ...prev];
      }


      // UPDATE → replace
      if (latest?.event === "loan.status_changed") {
        if (index === -1) return prev;


        const copy = [...prev];
        copy[index] = normalized;
        return copy;
      }


      return prev;
    });
  }, [messages]);
  const [rows, setRows] = useState<ManagerLoanRow[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Server-side paging / sorting state.
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([]);


  // Filter state (lifted from the filter bar so it can drive the fetch).
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [product, setProduct] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [appliedFrom, setAppliedFrom] = useState<Date>();
  const [appliedTo, setAppliedTo] = useState<Date>();
  const [productOptions, setProductOptions] = useState<
    { value: string; label: string }[]
  >([]);


  // Debounce the search box so we don't fetch on every keystroke.
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(timer);
  }, [search]);


  // Load the product filter options once.
  useEffect(() => {
    let active = true;
    getProducts(getCurrentSubdomain())
      .then((data) => {
        if (!active) return;
        setProductOptions(
          data.products.map((cp) => ({
            value: String(cp.product.id),
            label: cp.product.name,
          })),
        );
      })
      .catch(() => {
        if (active) setProductOptions([]);
      });
    return () => {
      active = false;
    };
  }, []);


  // ----- Translate filter / sort state into backend query params -----
  const ordering = sorting.length
    ? `${sorting[0].desc ? "-" : ""}${SORT_FIELD_MAP[sorting[0].id] ?? sorting[0].id}`
    : undefined;


  const dateFrom = appliedFrom ? format(appliedFrom, "yyyy-MM-dd") : undefined;
  const dateTo = appliedTo ? format(appliedTo, "yyyy-MM-dd") : undefined;


  // The "Sort By" dropdown is just a shortcut for ordering by date.
  const sortValue =
    sorting[0]?.id === "date_applied"
      ? sorting[0].desc
        ? "newest"
        : "oldest"
      : "";
  const onSortChange = (value: string) => {
    if (value === "newest") setSorting([{ id: "date_applied", desc: true }]);
    else if (value === "oldest")
      setSorting([{ id: "date_applied", desc: false }]);
    else setSorting([]);
  };


  // Any applied filter / sort / page-size change resets back to the first page.
  useEffect(() => {
    setPageIndex(0);
  }, [
    debouncedSearch,
    status,
    product,
    leadSource,
    dateFrom,
    dateTo,
    ordering,
    pageSize,
  ]);


  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      try {
        // The loans endpoint scopes to the manager's branch server-side.
        const { rows: data, count } = await getLoans({
          pageIndex,
          pageSize,
          ordering,
          search: debouncedSearch || undefined,
          statuses: status ? [status] : undefined,
          product: product || undefined,
          leadSource: leadSource || undefined,
          dateFrom,
          dateTo,
        });
        if (!active) return;
        setRows(
          data.map((item) => ({
            id: String(item.id),
            customer: item.customer_name ?? "—",
            product: item.product_name ?? "—",
            status: item.status,
            status_label: item.status_label,
            ibv: item.ibv,
            amount: Number(item.approved_amount ?? item.requested_amount ?? 0),
            date_applied: new Date(item.created_at).toLocaleString("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }),
          })),
        );
        setRowCount(count);
        setError(null);
      } catch (err) {
        if (!active) return;
        const code = (err as Error).message;
        setError(
          MyErrors[code as keyof typeof MyErrors] ??
            "Couldn't load loan applications. Please try again.",
        );
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pageIndex,
    pageSize,
    ordering,
    debouncedSearch,
    status,
    product,
    leadSource,
    dateFrom,
    dateTo,
  ]);


  return (
    <div className="md:mt-8  space-y-4">
      <LoanApplicationTableFilters
        search={search}
        onSearchChange={setSearch}
        sortValue={sortValue}
        onSortChange={onSortChange}
        status={status}
        onStatusChange={setStatus}
        statusOptions={LOAN_STATUS_OPTIONS}
        product={product}
        onProductChange={setProduct}
        productOptions={productOptions}
        leadSource={leadSource}
        onLeadSourceChange={setLeadSource}
        appliedFrom={appliedFrom}
        onAppliedFromChange={setAppliedFrom}
        appliedTo={appliedTo}
        onAppliedToChange={setAppliedTo}
      />


      {error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : loading && rows.length === 0 ? (
        <div className="flex items-center gap-2 text-[#868491]">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading loan applications…
        </div>
      ) : (
        <DataTable
          columns={managerLoanApplicationTableColumns}
          data={rows}
          ColumnClassName="bg-[#F2F4F6]  "
          rowClassName="gap-0 py-2   text-sm "
          showExport={false}
          showFilters={false}
          isSelectable={true}
          manualPagination
          manualSorting
          rowCount={rowCount}
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={setPageIndex}
          onPageSizeChange={setPageSize}
          sorting={sorting}
          onSortingChange={setSorting}
        />
      )}
    </div>
  );
};


export default LoanApplicationTable;
