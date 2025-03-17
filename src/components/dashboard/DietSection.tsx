
import React from 'react';
import NutritionChart from './nutrition/NutritionChart';
import MacroSummary from './nutrition/MacroSummary';
import MealsList from './nutrition/MealsList';

const DietSection = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <NutritionChart />
        <MacroSummary />
      </div>

      <div className="mt-6">
        <MealsList />
      </div>
    </div>
  );
};

export default DietSection;
