
import React from 'react';
import { IEvent } from '../types';
import EventCard from './EventCard';
import AddEventForm from './AddEventForm';

interface DayColumnProps {
  date: string;
  events: IEvent[];
  addEvent: (date: string, event: Omit<IEvent, 'id'>) => void;
  deleteEvent: (date: string, eventId: string) => void;
}

const DayColumn: React.FC<DayColumnProps> = ({ date, events, addEvent, deleteEvent }) => {
  const dateObj = new Date(date);
  const dayOfWeek = dateObj.toLocaleDateString('ko-KR', { weekday: 'long' });
  const formattedDate = dateObj.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b-2 border-gray-100 bg-gray-50 rounded-t-xl">
        <h3 className="font-bold text-lg text-gray-700">{formattedDate}</h3>
        <p className="text-sm text-gray-500">{dayOfWeek}</p>
      </div>
      <div className="p-4 space-y-3 overflow-y-auto flex-grow" style={{ minHeight: '300px' }}>
        {events.length === 0 ? (
          <p className="text-center text-gray-400 pt-10">일정이 없습니다.</p>
        ) : (
          events.map(event => (
            <EventCard key={event.id} event={event} onDelete={() => deleteEvent(date, event.id)} />
          ))
        )}
      </div>
      <div className="p-4 border-t border-gray-200 mt-auto">
        <AddEventForm onAddEvent={(event) => addEvent(date, event)} />
      </div>
    </div>
  );
};

export default DayColumn;
