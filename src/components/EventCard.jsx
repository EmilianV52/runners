import React from 'react';
import TeamSection from './TeamSection';

const EventCard = ({ event, onUpdateItem }) => {
  // Calculate totals across all teams for this event
  const totals = {};
  event.teams.forEach(team => {
    team.items.forEach(item => {
      if (!totals[item.name]) {
        totals[item.name] = 0;
      }
      totals[item.name] += item.quantity;
    });
  });

  return (
    <div className="bg-white dark:bg-dark-border rounded-xl shadow-md overflow-hidden mb-6 border-2 border-light-border dark:border-dark-border flex flex-col">
      <div className="bg-light-heading dark:bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold flex items-center justify-between">
          <span>Event: {event.date}</span>
        </h2>
      </div>
      
      <div className="p-4 flex-1">
        {event.teams.map((team) => (
          <TeamSection
            key={team.name}
            teamName={team.name}
            items={team.items}
            onUpdateItem={(teamName, itemName, quantity) => 
              onUpdateItem(event.id, teamName, itemName, quantity)
            }
          />
        ))}
      </div>

      <div className="bg-light-bg dark:bg-dark-bg p-4 border-t-4 border-light-heading dark:border-gray-500">
        <h3 className="text-lg font-black mb-2 text-light-heading dark:text-dark-text tracking-wider">TOTAL</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(totals).map(([itemName, totalQuantity]) => (
            <div key={itemName} className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded shadow-sm border border-gray-200 dark:border-gray-600">
              <span className="font-semibold">{itemName}:</span>
              <span className="font-bold text-xl">{totalQuantity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
