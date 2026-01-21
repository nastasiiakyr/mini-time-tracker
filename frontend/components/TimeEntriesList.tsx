"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Entry = {
  id: number;
  date: string;
  project: string;
  hours: number;
  description: string;
};

type GroupedEntries = {
  [date: string]: {
    entries: Entry[];
    total: number;
  };
};

type Props = {
  refresh: boolean;
};

export default function TimeEntriesList({ refresh }: Props) {
  const [data, setData] = useState<{
    groupedEntries: GroupedEntries;
    grandTotal: number;
  } | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/time-entries")
      .then((res) => setData(res.data));
  }, [refresh]);

  function formatDate(dateString: string) {
    const d = new Date(dateString);
    const today = new Date();

    // If date is today
    if (d.toDateString() === today.toDateString()) {
      return "Today";
    }

    // Otherwise format as DD.MM.YYYY
    return new Intl.DateTimeFormat("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(d);
  }

  if (!data) {
    return (
      <div className="text-sm text-foreground/60">Loading time entries…</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Days */}
      {Object.entries(data.groupedEntries)
        // Sort dates: today first, then from newest to oldest
        .sort(([dateA], [dateB]) => {
          const dA = new Date(dateA);
          const dB = new Date(dateB);
          const today = new Date();

          // Today goes first
          if (dA.toDateString() === today.toDateString()) return -1;
          if (dB.toDateString() === today.toDateString()) return 1;

          // For all others — from newest to oldest
          return dB.getTime() - dA.getTime();
        })
        .map(([date, group]) => (
          <div
            key={date}
            className="rounded-2xl border border-black/10 bg-background p-5 shadow-sm"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{formatDate(date)}</h3>
              <span className="rounded-full bg-black/5 px-3 py-1 text-sm font-medium">
                {group.total}h
              </span>
            </div>

            {/* Entries */}
            <ul className="space-y-3">
              {group.entries.map((e) => (
                <li
                  key={e.id}
                  className="flex items-start justify-between rounded-xl bg-black/5 p-4"
                >
                  <div>
                    <p className="font-medium">{e.project}</p>
                    <p className="text-sm text-foreground/70">
                      {e.description}
                    </p>
                  </div>

                  <div className="ml-4 shrink-0 text-sm font-semibold">
                    {e.hours}h
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}

      {/* Grand total */}
      <div className="flex items-center justify-between rounded-2xl bg-black p-5 text-white">
        <span className="text-sm uppercase tracking-wide opacity-80">
          Grand total
        </span>
        <span className="text-2xl font-bold">{data.grandTotal}h</span>
      </div>
    </div>
  );
}
