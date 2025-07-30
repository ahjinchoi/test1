
import React from 'react';
import { IEvent } from '../types';
import { TrashIcon } from './IconComponents';

interface EventCardProps {
  event: IEvent;
  onDelete: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onDelete }) => {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg flex justify-between items-center transition-transform transform hover:scale-105">
      <div>
        <p className="font-bold text-blue-800">{event.time}</p>
        <p className="text-gray-700">{event.description}</p>
      </div>
      <button
        onClick={onDelete}
        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full"
        aria-label="Delete event"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default EventCard;
