import React, { useState } from "react";

function SegmentBuilder({ onChange }) {
  const [rules, setRules] = useState([{ field: "spend", operator: "$gt", value: "" }]);

  const handleChange = (index, key, value) => {
    const updated = [...rules];
    updated[index][key] = value;
    setRules(updated);
    onChange(updated); // pass rules to parent
  };

  const addRule = () => {
    setRules([...rules, { field: "spend", operator: "$gt", value: "" }]);
  };

  return (
    <div>
      <h3>Segment Builder</h3>
      {rules.map((rule, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <select
            value={rule.field}
            onChange={e => handleChange(i, "field", e.target.value)}
          >
            <option value="spend">Spend</option>
            <option value="visits">Visits</option>
          </select>

          <select
            value={rule.operator}
            onChange={e => handleChange(i, "operator", e.target.value)}
          >
            <option value="$gt">&gt;</option>
            <option value="$lt">&lt;</option>
            <option value="$eq">=</option>
          </select>

          <input
            type="number"
            value={rule.value}
            onChange={e => handleChange(i, "value", e.target.value)}
          />
        </div>
      ))}
      <button onClick={addRule}>+ Add Rule</button>
    </div>
  );
}

export default SegmentBuilder;
