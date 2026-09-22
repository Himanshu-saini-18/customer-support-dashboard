function Badge({ value }) {
  const colors = {
    Open: "bg-blue-50 text-blue-700",
    "In Progress": "bg-amber-50 text-amber-700",
    Resolved: "bg-emerald-50 text-emerald-700",
    Low: "bg-slate-100 text-slate-700",
    Medium: "bg-orange-50 text-orange-700",
    High: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        colors[value] || "bg-slate-100 text-slate-700"
      }`}
    >
      {value}
    </span>
  );
}

export default Badge;
