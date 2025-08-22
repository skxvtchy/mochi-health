"use client";

import { Table } from "./table";
import { useState } from "react";

export default function Tracker() {
  const [goalWeight, setGoalWeight] = useState(150);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [editingGoalValue, setEditingGoalValue] = useState(goalWeight);

  const handleGoalEdit = () => {
    setIsEditingGoal(true);
    setEditingGoalValue(goalWeight);
  };

  const handleGoalSave = () => {
    setGoalWeight(editingGoalValue);
    setIsEditingGoal(false);
  };

  const handleGoalCancel = () => {
    setEditingGoalValue(goalWeight);
    setIsEditingGoal(false);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4  bg-white rounded-lg border-1 border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-sm text-gray-600">Current Weight</h3>
            <p className="text-sm text-green-600 font-medium">-12.5lbs</p>
          </div>

          <p className="text-2xl font-bold text-gray-900 pb-5">184 lbs</p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 mt-1">
                Keep at it you got this!
              </p>
              <p className="text-xs text-gray-500">
                Weight tracking for 3 months
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Start Weight</p>
              <p className="text-sm text-gray-900 font-medium">345 lbs</p>
            </div>
          </div>
        </div>

        <div className="p-4  bg-white rounded-lg border-1 border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-sm text-gray-600">Average Daily Change</h3>
            <p className="text-sm text-green-600 font-medium">-0.5%</p>
          </div>
          <p className="text-2xl font-bold text-gray-900 pb-5">1.5 lbs</p>
          <p className="text-xs text-gray-500 mt-1">Keep at it you got this!</p>
          <p className="text-xs text-gray-500">
            Weight tracking for the last 3 months
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg border-1 border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-sm text-gray-600">Goal Weight</h3>
            {!isEditingGoal && (
              <button
                onClick={handleGoalEdit}
                className="text-xs text-gray-600 hover:gray-blue-800 font-semibold"
              >
                Edit
              </button>
            )}
          </div>

          {isEditingGoal ? (
            <div className="pb-5">
              <input
                type="number"
                value={editingGoalValue}
                onChange={(e) => setEditingGoalValue(Number(e.target.value))}
                className="text-2xl font-bold text-gray-900 w-20 border-b-2 border-blue-500 focus:outline-none"
                autoFocus
              />
              <span className="text-2xl font-bold text-gray-900 ml-1">lbs</span>
            </div>
          ) : (
            <>
              <p className="text-2xl font-bold text-gray-900 pb-5">
                {goalWeight} lbs
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Your almost at your goal :-)
              </p>
              <p className="text-xs text-gray-500">Goal weight target</p>
            </>
          )}

          {isEditingGoal && (
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleGoalSave}
                className="px-2 py-1 bg-gray-800 text-white rounded text-xs hover:bg-gray-500 font-semibold"
              >
                Save
              </button>
              <button
                onClick={handleGoalCancel}
                className="px-2 py-1 text-black rounded text-xs font-semibold border border-gray-500"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <Table />
      </div>
    </div>
  );
}
