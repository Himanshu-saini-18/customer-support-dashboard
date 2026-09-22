import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTickets } from "../redux/ticketsSlice";
import Header from "../componets/Header";
import StatsCard from "../componets/StatsCard";
import TicketFilters from "../componets/TicketFilters";
import TicketList from "../componets/TicketList";
import TicketDetails from "../componets/TicketDetails";

function Dashboard() {
  const dispatch = useDispatch();

  const { tickets, searchText, statusFilter, priorityFilter, loading, error } =
    useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open",
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress",
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved",
  ).length;

  const filteredTickets = tickets.filter((ticket) => {
    const search = searchText.trim().toLowerCase();

    const matchesSearch =
      ticket.customerName.toLowerCase().includes(search) ||
      ticket.subject.toLowerCase().includes(search) ||
      ticket.email.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) {
    return (
      <main className="min-h-screen p-6">
        <p>Loading tickets...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-6">
        <p className="text-red-600">{error}</p>

        <button
          onClick={() => dispatch(fetchTickets())}
          className="mt-3 rounded bg-slate-900 px-4 py-2 text-white"
        >
          Try again
        </button>
      </main>
    );
  }

  if (tickets.length === 0) {
    return (
      <main className="min-h-screen p-6">
        <p>No tickets available.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Header />

        <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatsCard
            title="Total Tickets"
            value={tickets.length}
            color="bg-slate-500"
          />

          <StatsCard title="Open" value={openTickets} color="bg-blue-500" />

          <StatsCard
            title="In Progress"
            value={inProgressTickets}
            color="bg-amber-500"
          />

          <StatsCard
            title="Resolved"
            value={resolvedTickets}
            color="bg-emerald-500"
          />
        </section>

        <TicketFilters />

        {filteredTickets.length === 0 ? (
          <div className="mt-6 rounded-lg border border-slate-200 bg-white p-8 text-center">
            <h2 className="font-semibold text-slate-900">No tickets found</h2>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <TicketList tickets={filteredTickets} />
        )}
      </div>
      <TicketDetails/>
    </main>
  );
}

export default Dashboard;
