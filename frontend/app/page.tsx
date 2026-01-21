"use client";

import { useState } from "react";
import TimeEntryForm from "../components/TimeEntryForm";
import TimeEntriesList from "../components/TimeEntriesList";

export default function Page() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="space-y-6">
      <TimeEntryForm onSuccess={() => setRefresh(!refresh)} />
      <TimeEntriesList refresh={refresh} />
    </div>
  );
}
