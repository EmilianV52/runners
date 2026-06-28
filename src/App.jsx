import React, { useState, useEffect } from 'react';
import EventCard from './components/EventCard';

const initialData = [
  {
    id: '1',
    date: '26.06',
    teams: [
      { name: 'Checkin', items: [{ name: 'Bax Apă', quantity: 0 }, { name: 'Sendviș', quantity: 0 }, { name: 'Vegie', quantity: 0 }] },
      { name: 'Scanare', items: [{ name: 'Bax Apă', quantity: 0 }, { name: 'Sendviș', quantity: 0 }, { name: 'Vegie', quantity: 0 }] },
      { name: 'Obiecte Pierdute', items: [{ name: 'Bax Apă', quantity: 0 }, { name: 'Sendviș', quantity: 0 }, { name: 'Vegie', quantity: 0 }] },
      { name: 'Direcționare', items: [{ name: 'Bax Apă', quantity: 0 }, { name: 'Sendviș', quantity: 0 }, { name: 'Vegie', quantity: 0 }] },
      { name: 'Runners', items: [{ name: 'Bax Apă', quantity: 0 }, { name: 'Sendviș', quantity: 0 }, { name: 'Vegie', quantity: 0 }] },
      { name: 'Șefii', items: [{ name: 'Bax Apă', quantity: 0 }, { name: 'Sendviș', quantity: 0 }, { name: 'Vegie', quantity: 0 }] }
    ]
  },
  {
    id: '2',
    date: '27.06',
    teams: [
      { name: 'Checkin', 
        items: [
          { name: 'Bax Apă', quantity: 0 }, 
          { name: 'Sendviș', quantity: 0 }, 
          { name: 'Vegie', quantity: 0 }] },
      { name: 'Scanare',
         items: [
          { name: 'Bax Apă', quantity: 0 },
           { name: 'Sendviș', quantity: 0 },
            { name: 'Vegie', quantity: 0 }] },
      { name: 'Obiecte Pierdute', 
        items: [
          { name: 'Bax Apă', quantity: 0 },
           { name: 'Sendviș', quantity: 0 },
            { name: 'Vegie', quantity: 0 }] },
      { name: 'Direcționare',
         items: [{ name: 'Bax Apă', quantity: 0 },
           { name: 'Sendviș', quantity: 0 },
            { name: 'Vegie', quantity: 0 }] },
      { name: 'Runners',
         items: [{ name: 'Bax Apă', quantity: 0 },
           { name: 'Sendviș', quantity: 0 },
            { name: 'Vegie', quantity: 0 }] },
      { name: 'Șefii',
         items: [{ name: 'Bax Apă', quantity: 0 },
           { name: 'Sendviș', quantity: 0 }, 
           { name: 'Vegie', quantity: 0 }] }
    ]
  }
];

function App() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('catering_events_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved data', e);
      }
    }
    return initialData;
  });

  const [selectedEventId, setSelectedEventId] = useState(() => {
    const savedId = localStorage.getItem('catering_selected_event');
    return savedId || (events.length > 0 ? events[0].id : null);
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [isEditingEvent, setIsEditingEvent] = useState(false);

  useEffect(() => {
    localStorage.setItem('catering_events_data', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    if (selectedEventId) {
      localStorage.setItem('catering_selected_event', selectedEventId);
    }
  }, [selectedEventId]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const currentEvent = events.find(e => e.id === selectedEventId) || events[0];

  const handleUpdateItem = (eventId, teamName, itemName, newQuantity) => {
    setEvents(prevEvents => 
      prevEvents.map(event => {
        if (event.id === eventId) {
          return {
            ...event,
            teams: event.teams.map(team => {
              if (team.name === teamName) {
                return {
                  ...team,
                  items: team.items.map(item => {
                    if (item.name === itemName) {
                      return { ...item, quantity: newQuantity };
                    }
                    return item;
                  })
                };
              }
              return team;
            })
          };
        }
        return event;
      })
    );
  };

  const handleCreateEvent = () => {
    const defaultTeams = [
      { name: 'Checkin', items: [{ name: 'Bax Apă', quantity: 0 }, { name: 'Sendviș', quantity: 0 }, { name: 'Vegie', quantity: 0 }] },
      { name: 'Scanare', items: [{ name: 'Bax Apă', quantity: 0 }, { name: 'Sendviș', quantity: 0 }, { name: 'Vegie', quantity: 0 }] },
      { name: 'Obiecte Pierdute', items: [{ name: 'Bax Apă', quantity: 0 }, { name: 'Sendviș', quantity: 0 }, { name: 'Vegie', quantity: 0 }] },
      { name: 'Direcționare', items: [{ name: 'Bax Apă', quantity: 0 }, { name: 'Sendviș', quantity: 0 }, { name: 'Vegie', quantity: 0 }] },
      { name: 'Runners', items: [{ name: 'Bax Apă', quantity: 0 }, { name: 'Sendviș', quantity: 0 }, { name: 'Vegie', quantity: 0 }] },
      { name: 'Șefii', items: [{ name: 'Bax Apă', quantity: 0 }, { name: 'Sendviș', quantity: 0 }, { name: 'Vegie', quantity: 0 }] }
    ];

    const newEvent = {
      id: Date.now().toString(),
      date: `Eveniment ${events.length + 1}`,
      teams: defaultTeams
    };

    setEvents(prev => [...prev, newEvent]);
    setSelectedEventId(newEvent.id);
  };

  const handleEditEventName = (e) => {
    const newName = e.target.value;
    setEvents(prev => prev.map(ev => 
      ev.id === selectedEventId ? { ...ev, date: newName } : ev
    ));
  };

  const exportToCSV = () => {
    if (!currentEvent) return;

    let csvContent = "Team,Item Category,Quantity\n";
    const totals = {};

    currentEvent.teams.forEach(team => {
      team.items.forEach(item => {
        csvContent += `"${team.name}","${item.name}",${item.quantity}\n`;
        if (!totals[item.name]) {
          totals[item.name] = 0;
        }
        totals[item.name] += item.quantity;
      });
    });

    csvContent += `\n"EVENT TOTALS","",""\n`;
    Object.entries(totals).forEach(([itemName, totalQuantity]) => {
      csvContent += `"","${itemName}",${totalQuantity}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Catering_Tracker_${currentEvent.date.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearData = () => {
    if (window.confirm("Sigur vrei să resetezi toate cantitățile la zero pentru ACEST eveniment?")) {
      setEvents(prev => prev.map(ev => {
        if (ev.id === selectedEventId) {
          return {
            ...ev,
            teams: ev.teams.map(team => ({
              ...team,
              items: team.items.map(item => ({ ...item, quantity: 0 }))
            }))
          };
        }
        return ev;
      }));
    }
  };

  const hardResetApp = () => {
    if (window.confirm("ATENȚIE: Sigur vrei să ștergi TOATE datele vechi și să încarci structura nouă cu cele 6 echipe complete? Toate înregistrările curente vor fi pierdute!")) {
      localStorage.removeItem('catering_events_data');
      localStorage.removeItem('catering_selected_event');
      setEvents(initialData);
      setSelectedEventId(initialData[0].id);
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans max-w-2xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white dark:bg-dark-bg p-4 rounded-xl shadow-sm border border-light-border dark:border-dark-border gap-4">
        <h1 className="text-2xl font-black text-light-heading dark:text-dark-text tracking-tight uppercase">
          blabla
        </h1>
        <div className="flex space-x-3 items-center w-full sm:w-auto justify-end">
          <button 
            onClick={exportToCSV}
            className="text-sm px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition shadow-sm"
          >
            Export CSV
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-xl shadow-inner transition-colors shrink-0"
            aria-label="Toggle theme"
          >
            {darkMode ? '🌚' : '🌞'}
          </button>
        </div>
      </header>

      <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex flex-col space-y-1 w-full sm:w-2/3">
            <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Select Event:</label>
            <select
              value={selectedEventId || ''}
              onChange={(e) => {
                setSelectedEventId(e.target.value);
                setIsEditingEvent(false);
              }}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-light-heading dark:text-dark-text font-medium w-full focus:outline-none focus:ring-2 focus:ring-light-text dark:focus:ring-gray-500"
            >
              {events.map(ev => (
                <option key={ev.id} value={ev.id}>
                  {ev.date}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleCreateEvent}
            className="w-full sm:w-auto mt-2 sm:mt-5 text-sm px-4 py-2 bg-light-text text-white dark:bg-gray-600 dark:text-gray-100 rounded font-bold hover:bg-opacity-90 transition shadow-sm whitespace-nowrap"
          >
            + New Event
          </button>
        </div>

        {currentEvent && (
          <div className="flex items-center space-x-2 pt-2 border-t border-gray-100 dark:border-gray-700">
            {isEditingEvent ? (
              <input 
                type="text" 
                value={currentEvent.date}
                onChange={handleEditEventName}
                onBlur={() => setIsEditingEvent(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingEvent(false)}
                autoFocus
                className="p-1 border-b-2 border-light-text dark:border-gray-400 bg-transparent text-lg font-bold text-light-heading dark:text-dark-text focus:outline-none w-full"
              />
            ) : (
              <div className="flex items-center space-x-3 w-full">
                <span className="text-lg font-bold text-light-heading dark:text-dark-text truncate">
                  {currentEvent.date}
                </span>
                <button 
                  onClick={() => setIsEditingEvent(true)}
                  className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Edit Name
                </button>
                <div className="flex-1"></div>
                <button 
                  onClick={clearData}
                  className="text-xs px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 transition mr-2"
                >
                  Reset Event
                </button>
                <button 
                  onClick={hardResetApp}
                  className="text-xs px-2 py-1 bg-gray-800 text-white dark:bg-red-700 dark:text-white rounded hover:bg-opacity-90 transition"
                >
                  Reset Complet Aplicatie
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <main className="space-y-6">
        {currentEvent ? (
          <EventCard 
            key={currentEvent.id}
            event={currentEvent}
            onUpdateItem={handleUpdateItem}
          />
        ) : (
          <div className="text-center p-8 text-gray-500 dark:text-gray-400">
            No events found. Please create one.
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
