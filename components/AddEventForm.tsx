
import React, { useState } from 'react';
import { IEvent } from '../types';
import { PlusIcon } from './IconComponents';

interface AddEventFormProps {
  onAddEvent: (event: Omit<IEvent, 'id'>) => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ onAddEvent }) => {
  const [time, setTime] = useState('09:00');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onAddEvent({ time, description });
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex items-center space-x-2">
        <label htmlFor="time" className="sr-only">Time</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-28 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <label htmlFor="description" className="sr-only">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="새로운 일정"
          className="p-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-semibold disabled:bg-blue-300"
        disabled={!description.trim()}
      >
        <PlusIcon className="w-5 h-5" />
        일정 추가
      </button>
    </form>
  );
};

export default AddEventForm;
