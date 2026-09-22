import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  setPriorityFilter,
  setSearchText,
  setStatusFilter,
} from "../redux/ticketsSlice";

function TicketFilters() {
  const dispatch = useDispatch();

  const { searchText, statusFilter, priorityFilter } = useSelector(
    (state) => state.tickets,
  );

  return (
    <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4">
      <div className="grid gap-3 md:grid-cols-4">
        <input
          type="search"
          value={searchText}
          onChange={(event) => dispatch(setSearchText(event.target.value))}
          placeholder="Search tickets..."
          className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 md:col-span-2"
        />

        <select
          value={statusFilter}
          onChange={(event) => dispatch(setStatusFilter(event.target.value))}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
        >
          <option value="All">All statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => dispatch(setPriorityFilter(event.target.value))}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
        >
          <option value="All">All priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {(searchText || statusFilter !== "All" || priorityFilter !== "All") && (
        <button
          type="button"
          onClick={() => dispatch(clearFilters())}
          className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

export default TicketFilters;
