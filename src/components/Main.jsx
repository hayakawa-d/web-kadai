import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import Chart from "./Chart";

function Main() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ date: "", total: "", hit: "", memo: "" });
  const [mode, setMode] = useState("daily"); // daily, weekly, monthly

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "users", auth.currentUser.uid, "records"),
      orderBy("date")
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(doc => doc.data());
      setRecords(data);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      memo: name === "date" ? "" : prev.memo // 日付変更時だけメモリセット
    }));
  };

  const addRecord = async () => {
    if (!form.date || !form.total || !form.hit || !auth.currentUser) return;

    const recordRef = doc(db, "users", auth.currentUser.uid, "records", form.date); // 日付IDで上書き
    await setDoc(recordRef, {
      date: form.date,
      total: form.total,
      hit: form.hit,
      memo: form.memo
    });

    setForm(prev => ({ ...prev, memo: "" })); // メモだけリセット
  };

  const grouped = records.reduce((acc, r) => {
    const month = r.date.slice(0, 7);
    if (!acc[month]) acc[month] = [];
    acc[month].push(r);
    return acc;
  }, {});

  return (
    <main style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <section>
        <h2>練習記録の入力</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <input type="date" name="date" value={form.date} onChange={handleChange} />
          <input type="number" name="total" placeholder="総射数" value={form.total} onChange={handleChange} />
          <input type="number" name="hit" placeholder="的中数" value={form.hit} onChange={handleChange} />
          <textarea name="memo" placeholder="その日のメモ" value={form.memo} onChange={handleChange} />
          <button onClick={addRecord}>記録する</button>
        </div>
      </section>

      <section>
        <h2>的中率の推移</h2>
        <Chart records={records} mode={mode} />
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => setMode("daily")}>直近30日間</button>
          <button onClick={() => setMode("weekly")}>直近4週間</button>
          <button onClick={() => setMode("monthly")}>月別</button>
        </div>
      </section>

      <section>
        <h2>月別の振り返り</h2>
        {Object.keys(grouped).length === 0 && <p>まだ記録がありません。</p>}
        {Object.keys(grouped).map(month => (
          <div key={month}>
            <h3>{month}</h3>
            {grouped[month].map((r, i) => (
              <div key={i}>
                <p>{r.date}</p>
                <p>{Math.round((r.hit / r.total) * 100)}%</p>
                {r.memo && <p>{r.memo}</p>}
              </div>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}

export default Main;
