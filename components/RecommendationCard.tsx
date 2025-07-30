
import React from 'react';

interface RecommendationCardProps {
    title: string;
    description: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ title, description }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm">
      <h4 className="font-bold text-md text-gray-800">{title}</h4>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
};

export default RecommendationCard;
