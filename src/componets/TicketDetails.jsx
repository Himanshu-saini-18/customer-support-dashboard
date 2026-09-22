import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeTicket,
  updateTicketStatus,
} from "../redux/ticketsSlice";
import Badge from "./Badge";

function TicketDetails() {
  const dispatch = useDispatch();

  const { selectedTicket, updating } = useSelector(
    (state) => state.tickets,
  );

  if (!selectedTicket) {
    return null;
  }

  const createdDate = new Date(
    selectedTicket.createdAt,
  ).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleStatusChange = (event) => {
    dispatch(
      updateTicketStatus({
        id: selectedTicket.id,
        status: event.target.value,
      }),
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30"
      onClick={() => dispatch(closeTicket())}
    >
      <aside
        className="ml-auto h-full w-full max-w-md overflow-y-auto bg-white p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">
              Ticket #{selectedTicket.id}
            </p>

            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              {selectedTicket.subject}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => dispatch(closeTicket())}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
            aria-label="Close ticket details"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mt-5 flex gap-2">
          <Badge value={selectedTicket.status} />
          <Badge value={selectedTicket.priority} />
        </div>

        <section className="mt-6 border-t border-slate-200 pt-5">
          <h3 className="font-semibold text-slate-900">
            Customer information
          </h3>

          <div className="mt-3 space-y-2 text-sm">
            <p>
              <span className="text-slate-500">Name:</span>{" "}
              {selectedTicket.customerName}
            </p>

            <p>
              <span className="text-slate-500">Email:</span>{" "}
              {selectedTicket.email}
            </p>

            <p>
              <span className="text-slate-500">Phone:</span>{" "}
              {selectedTicket.phone}
            </p>
          </div>
        </section>

        <section className="mt-6 border-t border-slate-200 pt-5">
          <h3 className="font-semibold text-slate-900">
            Issue details
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {selectedTicket.description}
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Created: {createdDate}
          </p>
        </section>

        <section className="mt-6 border-t border-slate-200 pt-5">
          <label
            htmlFor="ticket-status"
            className="font-semibold text-slate-900"
          >
            Update status
          </label>

          <select
            id="ticket-status"
            value={selectedTicket.status}
            onChange={handleStatusChange}
            disabled={updating}
            className="mt-3 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          {updating && (
            <p className="mt-2 text-sm text-slate-500">
              Updating status...
            </p>
          )}
        </section>

        <section className="mt-6 border-t border-slate-200 pt-5">
          <h3 className="font-semibold text-slate-900">
            Conversation
          </h3>

          <div className="mt-3 whitespace-pre-line rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            {selectedTicket.conversation}
          </div>
        </section>
      </aside>
    </div>
  );
}

export default TicketDetails;