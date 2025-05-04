import { useState } from "react";
import { parse } from "date-fns";

const startDate = new Date("2025-05-05");
const shifts = ["Dimineață", "Noapte", "După-amiază"];

function getShiftForDate(dateStr: string): string {
  try {
    const date = parse(dateStr, "yyyy-MM-dd", new Date());
    const dayDiff = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const weekIndex = Math.floor(dayDiff / 7);
    return shifts[(weekIndex + 1) % 3];
  } catch {
    return "Dată invalidă";
  }
}

export default function Home() {
  const [inputDate, setInputDate] = useState("");
  const [shift, setShift] = useState("");

  return (
    <main style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
      <h1>Verifică schimbul</h1>
      <input
        type="date"
        value={inputDate}
        onChange={(e) => {
          const val = e.target.value;
          setInputDate(val);
          setShift(getShiftForDate(val));
        }}
        style={{ width: "100%", marginBottom: 10 }}
      />
      {shift && <p>Schimbul pe {inputDate} este: <strong>{shift}</strong></p>}
    </main>
  );
}
