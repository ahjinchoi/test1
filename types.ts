
export interface IEvent {
  id: string;
  time: string;
  description: string;
}

export interface ISchedule {
  [date: string]: IEvent[];
}

export interface IRestaurant {
  name: string;
  category: string;
  description: string;
}

export interface IItinerary {
  day: string;
  theme: string;
  morning: string;
  afternoon: string;
  evening: string;
}
