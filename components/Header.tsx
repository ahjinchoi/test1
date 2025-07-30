
import React from 'react';
import { PlaneIcon } from './IconComponents';

const Header: React.FC = () => {
  return (
    <header className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center justify-center gap-4">
        <PlaneIcon className="w-10 h-10 text-blue-500" />
        <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                Fukuoka Travel Planner
            </h1>
            <p className="mt-1 text-lg text-gray-500">
                후쿠오카 3박 4일 여행 플래너 (8/10 ~ 8/13)
            </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
