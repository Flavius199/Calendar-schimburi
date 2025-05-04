
import { useState } from "react";
import { format, parse } from "date-fns";

const startDate = new Date("2025-05-05");
const shifts = ["Dimineață", "Noapte", "După-amiază"];

function getShiftForDate(dateStr: string): string {
  try {
    const date = parse(dateStr, "yyyy-MM-dd", new Date());
    const dayDiff = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const weekIndex = Math.floor(dayDiff / 7);
    const shift = shifts[(weekIndex + 1) % 3];
    return shift;
  } catch {
    return "Format invalid";
  }
}

export default function Home() {
  const [inputDate, setInputDate] = useState("");
  const [shift, setShift] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputDate(value);
    setShift(getShiftForDate(value));
  };

  return (
    <main style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>Verifică schimbul</h1>
      <input type="date" value={inputDate} onChange={handleChange} style={{ marginTop: 10, marginBottom: 20, width: "100%" }} />
      {shift && (
        <div style={{ padding: 15, background: "#f0f0f0", borderRadius: 8 }}>
          Schimbul pe <strong>{inputDate}</strong> este: <br />
          <span style={{ fontWeight: "bold", color: "#0066cc" }}>{shift}</span>
        </div>
      )}
    </main>
  );
}
