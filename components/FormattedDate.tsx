
"use client";

import { useEffect, useState } from "react";

export default function FormattedDate({ date }: { date: string | Date }) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
  
    const d = new Date(date);
    setFormattedDate(d.toLocaleDateString());
  }, [date]);

  return <span>{formattedDate}</span>;
}