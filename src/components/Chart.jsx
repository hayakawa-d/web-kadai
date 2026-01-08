import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const getWeekKey = (dateStr) => {
  const d = new Date(dateStr);
  const day = d.getDay() || 7;
  d.setDate(d.getDate() - day + 1);
  return d.toISOString().slice(0, 10);
};

function Chart({ records, mode }) {
  let data = [];

  if (mode === "daily") {
    data = records
      .slice(-30)
      .map(r => ({
        label: r.date,
        rate: Math.round((r.hit / r.total) * 100)
      }));
  }

  if (mode === "weekly") {
    const weekly = {};
    records.forEach(r => {
      const key = getWeekKey(r.date);
      if (!weekly[key]) weekly[key] = { hit: 0, total: 0 };
      weekly[key].hit += Number(r.hit);
      weekly[key].total += Number(r.total);
    });
    data = Object.keys(weekly)
      .slice(-4)
      .map(key => ({
        label: key,
        rate: Math.round((weekly[key].hit / weekly[key].total) * 100)
      }));
  }

  if (mode === "monthly") {
    const monthly = {};
    records.forEach(r => {
      const key = r.date.slice(0, 7);
      if (!monthly[key]) monthly[key] = { hit: 0, total: 0 };
      monthly[key].hit += Number(r.hit);
      monthly[key].total += Number(r.total);
    });
    data = Object.keys(monthly).map(key => ({
      label: key,
      rate: Math.round((monthly[key].hit / monthly[key].total) * 100)
    }));
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="label" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Line type="monotone" dataKey="rate" stroke="#007aff" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
