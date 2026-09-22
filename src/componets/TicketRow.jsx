import Badge from "./Badge";

function TicketRow({ ticket, mobile, onView }) {
  const createdDate = new Date(ticket.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  if (mobile) {
    return (
      <article className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold text-slate-900">
              {ticket.customerName}
            </h2>

            <p className="mt-1 text-sm text-slate-600">{ticket.subject}</p>
          </div>

          <Badge value={ticket.priority} />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Badge value={ticket.status} />

          <span className="text-xs text-slate-500">{createdDate}</span>
        </div>

        <button
          type="button"
          onClick={() => onView(ticket)}
          className="mt-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
        >
          View details
        </button>
      </article>
    );
  }

  return (
    <tr className="border-t border-slate-200">
      <td className="px-4 py-4">
        <p className="font-medium text-slate-900">{ticket.customerName}</p>

        <p className="mt-1 text-xs text-slate-500">{ticket.email}</p>
      </td>

      <td className="px-4 py-4 text-sm text-slate-700">{ticket.subject}</td>

      <td className="px-4 py-4">
        <Badge value={ticket.priority} />
      </td>

      <td className="px-4 py-4">
        <Badge value={ticket.status} />
      </td>

      <td className="px-4 py-4 text-sm text-slate-600">{createdDate}</td>

      <td className="px-4 py-4 text-right">
        <button
          type="button"
          onClick={() => onView(ticket)}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View
        </button>
      </td>
    </tr>
  );
}

export default TicketRow;
