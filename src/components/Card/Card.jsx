import React from 'react';

const Card = ({ data }) => {
  const entries = Object.entries(data); // Get key-value pairs directly

  return (
    <div className="w-[150px] rounded-xl overflow-hidden shadow-lg border border-gray-300">
      <div className="p-4">
        {entries.map(([key, value]) => (
          <div key={key} className="text-center mb-2">
            <div className="text-3xl font-bold text-gray-800">{value}</div>
            <div className="text-lg font-light text-gray-500">{key}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
