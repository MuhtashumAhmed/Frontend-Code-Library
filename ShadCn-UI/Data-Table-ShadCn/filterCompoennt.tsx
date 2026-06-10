import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
type DocumentsTableFiltersProps = {
  filters: {
    search: string;
    status: string;
    amountRange: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  dateRange: any;
  setDateRange: React.Dispatch<React.SetStateAction<any>>;
  onClose: () => void;
};
export const EmployeeLoanApplicationTableFilters = ({
  filters,
  setFilters,
  dateRange,
  setDateRange,
  onClose,
}: DocumentsTableFiltersProps) => {
  return (
    <div className=" bg-white shadow-lg border rounded-xl p-4 font-sora  z-50">
      <h2 className="font-semibold mb-3">Filters</h2>


      <div>
        {/* SEARCH */}
        <label className="text-sm font-semibold text-[#565E74] ">Search</label>
        <input
          type="search"
          placeholder="Search applications..."
          className="w-full border p-2 rounded-lg mb-3 bg-[#EFF4FF] "
          value={filters.search}
          onChange={(e) =>
            setFilters((prev: any) => ({
              ...prev,
              search: e.target.value,
            }))
          }
        />
      </div>


      <div>
        {/* STATUS */}


        <label className="text-sm font-semibold text-[#565E74] ">
          Filter By Agent
        </label>
        <select
          className="w-full border p-2  mb-3 rounded-lg  bg-[#EFF4FF] "
          value={filters.status}
          onChange={(e) =>
            setFilters((prev: any) => ({ ...prev, status: e.target.value }))
          }
        >
          <option value="">All Status</option>
          <option value="peak">Peak</option>
          <option value="steady">steady</option>
          <option value="warning">Warning</option>
        </select>
      </div>


      {/* ACTION BUTTONS */}
      {/* <div className="flex gap-2 font-inter font-semibold text-xs">
        <button
          className="bg-myRed text-white px-3 py-2 rounded w-full"
          // onClick={() => setFiltersOpen(false)}
        >
          Apply Filters
        </button>


        <button
          className="bg-gray-200 px-3 py-2 rounded w-full"
          onClick={() =>
            setFilters({
              search: "",
              status: "",
              amountRange: "",
            })
          }
        >
          Reset
        </button>
      </div> */}
    </div>
  );
};


