function StatsCard({ title, value, color }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
        </div>

        <span className={`h-3 w-3 rounded-full ${color}`} />
      </div>
    </div>
  );
}

export default StatsCard;
