import React from 'react';

const HybridCounter = ({ value, onChange, label }) => {
  const handleMinus = () => {
    if (value > 0) onChange(value - 1);
  };

  const handlePlus = () => {
    onChange(value + 1);
  };

  const handleChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 0) {
      onChange(val);
    } else if (e.target.value === '') {
      onChange(0); // Optional: handle empty input as 0
    }
  };

  return (
    <div className="flex items-center justify-between p-2 bg-white dark:bg-light-border rounded-lg border border-light-border dark:border-dark-border shadow-sm mb-2">
      <span className="font-medium text-light-text dark:text-dark-text flex-1">
        {label}
      </span>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleMinus}
          className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 text-light-heading dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label={`Decrease ${label}`}
        >
          -
        </button>
        <input
          type="number"
          value={value === 0 ? '' : value}
          placeholder="0"
          onChange={handleChange}
          className="w-12 h-8 text-center bg-transparent border-b border-light-border dark:border-dark-border focus:outline-none focus:border-light-text dark:focus:border-dark-text font-bold text-light-heading dark:text-dark-text"
        />
        <button
          onClick={handlePlus}
          className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 text-light-heading dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default HybridCounter;
