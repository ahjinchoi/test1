
import React from 'react';
import { ISchedule, IEvent } from '../types';
import { TRAVEL_DATES } from '../constants';
import DayColumn from './DayColumn';

interface CalendarProps {
  schedule: ISchedule;
  addEvent: (date: string, event: Omit<IEvent, 'id'>) => void;
  deleteEvent: (date: string, eventId: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ schedule, addEvent, deleteEvent }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {TRAVEL_DATES.map(date => (
        <DayColumn
          key={date}
          date={date}
          events={schedule[date]}
          addEvent={addEvent}
          deleteEvent={deleteEvent}
        />
      ))}
    </div>
  );
};

export default Calendar;
