import React, { useState } from "react";

function SegmentBuilder({ onChange }) {
  const [rules, setRules] = useState([
    { field: "spend", operator: "$gt", value: "" },
  ]);

  const handleChange = (index, key, value) => {
    const updated = [...rules];
    updated[index][key] = value;
    setRules(updated);
    onChange(updated);
  };

  const addRule = () => {
    setRules([...rules, { field: "spend", operator: "$gt", value: "" }]);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">
        Define Audience Segment
      </h3>

      {rules.map((rule, i) => (
        <div
          key={i}
          className="border border-gray-300 rounded p-4 flex items-center space-x-4 bg-gray-50"
        >
          {/* Field Dropdown */}
          <select
            value={rule.field}
            onChange={(e) => handleChange(i, "field", e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-400"
          >
            <option value="spend">Spend</option>
            <option value="visits">Visits</option>
          </select>

          {/* Operator Dropdown */}
          <select
            value={rule.operator}
            onChange={(e) => handleChange(i, "operator", e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-400"
          >
            <option value="$gt">&gt;</option>
            <option value="$lt">&lt;</option>
            <option value="$eq">=</option>
          </select>

          {/* Value Input */}
          <input
            type="number"
            placeholder="Enter value"
            value={rule.value}
            onChange={(e) => handleChange(i, "value", e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 w-32 focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ))}

      {/* Add Rule Button */}
      <button
        onClick={addRule}
        className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
      >
        + Add Rule
      </button>
    </div>
  );
}

export default SegmentBuilder;
