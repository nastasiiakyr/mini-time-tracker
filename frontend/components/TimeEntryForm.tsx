"use client";

import { useState } from "react";
import axios from "axios";

export default function TimeEntryForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [project, setProject] = useState("Viso Internal");
  const [hours, setHours] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:4000/time-entries", {
        date,
        project,
        hours: Number(hours),
        description,
      });
      setHours("");
      setDescription("");
      onSuccess();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow space-y-4"
    >
      {error && <div className="text-red-500">{error}</div>}

      <div>
        <label className="block mb-1 font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Project</label>
        <select
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option>Viso Internal</option>
          <option>Client A</option>
          <option>Client B</option>
          <option>Personal Development</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Hours</label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          min={0}
          max={24}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  );
}
