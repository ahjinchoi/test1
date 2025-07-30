
import React, { useState, useCallback } from 'react';
import { IRestaurant, IItinerary } from '../types';
import { getRestaurantRecommendations, getItineraryRecommendations } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import RecommendationCard from './RecommendationCard';
import { FoodIcon, ItineraryIcon } from './IconComponents';

interface RecommendationSectionProps {
  restaurants: IRestaurant[];
  setRestaurants: React.Dispatch<React.SetStateAction<IRestaurant[]>>;
  itinerary: IItinerary[];
  setItinerary: React.Dispatch<React.SetStateAction<IItinerary[]>>;
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ restaurants, setRestaurants, itinerary, setItinerary }) => {
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(false);
  const [isLoadingItinerary, setIsLoadingItinerary] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchRestaurants = useCallback(async () => {
    setIsLoadingRestaurants(true);
    setError(null);
    try {
      const data = await getRestaurantRecommendations();
      setRestaurants(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoadingRestaurants(false);
    }
  }, [setRestaurants]);

  const handleFetchItinerary = useCallback(async () => {
    setIsLoadingItinerary(true);
    setError(null);
    try {
      const data = await getItineraryRecommendations();
      setItinerary(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoadingItinerary(false);
    }
  }, [setItinerary]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-6 h-full">
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleFetchRestaurants}
          disabled={isLoadingRestaurants}
          className="w-full flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-bold disabled:bg-green-300 shadow-md"
        >
          <FoodIcon className="w-6 h-6" />
          맛집 추천 받기
        </button>
        <button
          onClick={handleFetchItinerary}
          disabled={isLoadingItinerary}
          className="w-full flex items-center justify-center gap-2 p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all font-bold disabled:bg-purple-300 shadow-md"
        >
          <ItineraryIcon className="w-6 h-6" />
          여행 코스 추천 받기
        </button>
      </div>

      {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
      
      <div className="space-y-6">
        <div>
          {isLoadingRestaurants && <LoadingSpinner />}
          {restaurants.length > 0 && (
            <div className="space-y-4">
               <h3 className="text-xl font-bold text-gray-700 border-b-2 pb-2 border-green-200">추천 맛집</h3>
              {restaurants.map((r, i) => (
                <RecommendationCard key={i} title={`${r.name} (${r.category})`} description={r.description} />
              ))}
            </div>
          )}
        </div>

        <div>
          {isLoadingItinerary && <LoadingSpinner />}
          {itinerary.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-700 border-b-2 pb-2 border-purple-200">추천 여행 코스</h3>
              {itinerary.map((day, i) => (
                 <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-lg text-purple-700">{day.day}</h4>
                    <p className="text-sm italic text-gray-500 mb-2">{day.theme}</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li><strong className="font-semibold">오전:</strong> {day.morning}</li>
                        <li><strong className="font-semibold">오후:</strong> {day.afternoon}</li>
                        <li><strong className="font-semibold">저녁:</strong> {day.evening}</li>
                    </ul>
                 </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationSection;
