import { useDispatch } from "react-redux";
import { selectTicket } from "../redux/ticketsSlice";
import TicketRow from "./TicketRow";

function TicketList({ tickets }) {
  const dispatch = useDispatch();

  const handleViewTicket = (ticket) => {
    dispatch(selectTicket(ticket));
  };

  return (
    <section className="mt-6">
      <div className="space-y-3 md:hidden">
        {tickets.map((ticket) => (
          <TicketRow
            key={ticket.id}
            ticket={ticket}
            mobile
            onView={handleViewTicket}
          />
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-lg border border-slate-200 bg-white md:block">
        <table className="w-full border-collapse text-left">
          <thead className="bg-slate-50">
            <tr className="text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Issue</th>
              <th className="px-4 py-3 font-medium">Priority</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 text-right font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <TicketRow
                key={ticket.id}
                ticket={ticket}
                onView={handleViewTicket}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TicketList;