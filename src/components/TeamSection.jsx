import React from 'react';
import HybridCounter from './HybridCounter';

const TeamSection = ({ teamName, items, onUpdateItem }) => {
  return (
    <div className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-light-heading dark:bg-gray-700 p-2 border-b border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-bold text-white dark:text-gray-100">
          {teamName}
        </h3>
      </div>
      <div className="flex flex-col space-y-1 p-3">
        {items.map((item) => (
          <HybridCounter
            key={item.name}
            label={item.name}
            value={item.quantity}
            onChange={(newQuantity) => onUpdateItem(teamName, item.name, newQuantity)}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
