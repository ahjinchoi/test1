
import React, { useState } from 'react';
import { IEvent, ISchedule, IRestaurant, IItinerary } from './types';
import { TRAVEL_DATES } from './constants';
import Calendar from './components/Calendar';
import Header from './components/Header';
import RecommendationSection from './components/RecommendationSection';

const App: React.FC = () => {
  const initialSchedule = TRAVEL_DATES.reduce((acc, date) => {
    acc[date] = [];
    return acc;
  }, {} as ISchedule);

  const [schedule, setSchedule] = useState<ISchedule>(initialSchedule);
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [itinerary, setItinerary] = useState<IItinerary[]>([]);

  const addEvent = (date: string, event: Omit<IEvent, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setSchedule(prevSchedule => {
      const dayEvents = [...prevSchedule[date], newEvent];
      dayEvents.sort((a, b) => a.time.localeCompare(b.time));
      return { ...prevSchedule, [date]: dayEvents };
    });
  };

  const deleteEvent = (date: string, eventId: string) => {
    setSchedule(prevSchedule => ({
      ...prevSchedule,
      [date]: prevSchedule[date].filter(event => event.id !== eventId)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
             <h2 className="text-2xl font-bold text-gray-700 mb-4">🗓️ 여행 일정</h2>
            <Calendar
              schedule={schedule}
              addEvent={addEvent}
              deleteEvent={deleteEvent}
            />
          </div>
          <div className="lg:col-span-1">
             <h2 className="text-2xl font-bold text-gray-700 mb-4">✨ AI 추천</h2>
            <RecommendationSection
              setRestaurants={setRestaurants}
              restaurants={restaurants}
              setItinerary={setItinerary}
              itinerary={itinerary}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
