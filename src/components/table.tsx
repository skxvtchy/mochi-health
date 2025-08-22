"use client";

import { useState, useEffect } from "react";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

interface weightData {
  id?: number;
  date: string;
  weight: number;
  note: string;
}

interface RawSupabaseData {
  id?: number;
  created_at: string;
  weight: number;
  note: string;
}

const STARTING_WEIGHT = 345;
// const weightData = [
//   { date: "2024-06-07T00:00:00Z", weight: 345, notes: "Back to routine" },
//   { date: "2024-06-06T00:00:00Z", weight: 338, notes: "Weekend weight" },
//   { date: "2024-06-05T00:00:00Z", weight: 335, notes: "Great day!" },
//   { date: "2024-06-04T00:00:00Z", weight: 339, notes: "Consistent loss" },
//   { date: "2024-06-03T00:00:00Z", weight: 342, notes: "Back on track" },
//   { date: "2024-06-02T00:00:00Z", weight: 348, notes: "Water retention" },
//   { date: "2024-06-01T00:00:00Z", weight: 300, notes: "Good progress week" },
// ];

export function Table() {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [data, setData] = useState<weightData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        console.error("Missing Supabase environment variables");
        return;
      }

      // sort by created_at in ascending order
      const res = await fetch(`${SUPABASE_URL}?order=created_at.asc`, {
        method: "GET",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();
      //   console.log("Fetched data:", json);

      if (json && Array.isArray(json)) {
        const transformedData = json.map((item: RawSupabaseData) => ({
          id: item.id,
          date: item.created_at
            ? item.created_at.split("T")[0]
            : new Date().toISOString().split("T")[0],
          weight: item.weight || 0,
          note: item.note || "No notes",
        }));

        setData(transformedData.reverse());
        console.log("Data set successfully, length:", transformedData.length);
      } else {
        console.error("Invalid data format:", json);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const handleEdit = (index: number) => {
    setEditingRow(index);
  };

  const handleSave = async (index: number) => {
    try {
      const updatedEntry = data[index];
      console.log(updatedEntry.id);

      // Check if this is a new entry (no ID) or existing entry
      if (updatedEntry.id) {
        // Update existing entry
        const response = await fetch(
          `${SUPABASE_URL}?id=eq.${updatedEntry.id}`,
          {
            method: "PATCH",
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
              "Content-Type": "application/json",
              Prefer: "return=minimal",
            },
            body: JSON.stringify({
              weight: updatedEntry.weight,
              note: updatedEntry.note,
              created_at: updatedEntry.date,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to update entry: ${response.status}`);
        }

        console.log("Entry updated successfully");
      } else {
        // Create new entry
        const response = await fetch(SUPABASE_URL, {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            weight: updatedEntry.weight,
            note: updatedEntry.note,
            created_at: updatedEntry.date,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to create entry: ${response.status}`);
        }

        console.log("Entry created successfully");

        // Refresh data from server to get the new ID
        await fetchData();
      }

      setEditingRow(null);
    } catch (error) {
      console.error("Error saving entry:", error);
      // You could add user notification here
    }
  };

  const handleCancel = () => {
    setEditingRow(null);
  };

  const handleInputChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
  };

  const addNewEntry = () => {
    // Don't add new entry if one is already being edited
    if (editingRow !== null) {
      console.log("Cannot add new entry while editing existing one");
      return;
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    const newEntry = {
      date: dateString,
      weight: STARTING_WEIGHT,
      note: "New entry",
    };
    setData([newEntry, ...data]);
    // console.log(data);
    setEditingRow(0);
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 h-full flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Weight Entries
          </h3>
          <button
            onClick={addNewEntry}
            className="px-3 py-1 bg-gray-800 text-white rounded-md text-sm font-medium"
          >
            Add Entry
          </button>
        </div>
        <div className="overflow-x-auto border border-gray-200 rounded-md flex-1">
          <table className="w-full">
            <thead className="bg-[#e6e6eb] rounded-md">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                  Date
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                  Weight
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                  Change %
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                  Notes
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr
                  key={`${entry.date}-${index}`}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index === data.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {editingRow === index ? (
                      <input
                        type="date"
                        value={entry.date}
                        onChange={(e) =>
                          handleInputChange(index, "date", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      new Date(entry.date + "T00:00:00").toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      )
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {editingRow === index ? (
                      <input
                        type="text"
                        value={entry.weight}
                        onChange={(e) =>
                          handleInputChange(index, "weight", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      entry.weight + " lbs"
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">
                    {index === data.length - 1 ? (
                      <span
                        className={
                          entry.weight - STARTING_WEIGHT > 0
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        {entry.weight - STARTING_WEIGHT > 0 ? "+" : ""}
                        {(
                          ((entry.weight - STARTING_WEIGHT) / STARTING_WEIGHT) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    ) : (
                      <span
                        className={
                          data[index + 1]
                            ? entry.weight - data[index + 1].weight > 0
                              ? "text-red-600"
                              : "text-green-600"
                            : entry.weight - STARTING_WEIGHT > 0
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        {data[index + 1]
                          ? entry.weight - data[index + 1].weight > 0
                            ? "+"
                            : ""
                          : entry.weight - STARTING_WEIGHT > 0
                          ? "+"
                          : ""}
                        {data[index + 1]
                          ? (
                              ((entry.weight - data[index + 1].weight) /
                                data[index + 1].weight) *
                              100
                            ).toFixed(1)
                          : (
                              ((entry.weight - STARTING_WEIGHT) /
                                STARTING_WEIGHT) *
                              100
                            ).toFixed(1)}
                        %
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {editingRow === index ? (
                      <input
                        type="text"
                        value={entry.note}
                        onChange={(e) =>
                          handleInputChange(index, "note", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ) : (
                      entry.note
                    )}
                  </td>
                  <td className="px-5 text-sm">
                    {editingRow === index ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSave(index)}
                          className="px-2 py-1 bg-gray-800 text-white rounded text-xs hover:bg-gray-500 font-semibold"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-2 py-1 text-black rounded text-xs font-semibold border border-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(index)}
                        className="px-2 py-1 bg-gray-800 text-white rounded text-xs hover:bg-gray-500 font-semibold"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="text-sm text-gray-800">
          Showing 1 to {data.length} of {data.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            ←
          </button>
          <span className="px-3 py-1 text-sm bg-gray-900 text-white rounded-md">
            1
          </span>
          <button className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
