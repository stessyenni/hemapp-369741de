
import React from 'react';
import { Apple, Carrot, Coffee } from 'lucide-react';
import GlassmorphicCard from '@/components/ui-elements/GlassmorphicCard';
import FadeIn from '@/components/animations/FadeIn';
import MealItem from './MealItem';

// Sample data
const mealItems = [
  {
    id: 1,
    name: 'Greek Yogurt Bowl',
    calories: 320,
    icon: <Apple className="h-5 w-5" />,
    time: 'Breakfast',
    color: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    id: 2,
    name: 'Grilled Chicken Salad',
    calories: 420,
    icon: <Carrot className="h-5 w-5" />,
    time: 'Lunch',
    color: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    id: 3,
    name: 'Protein Smoothie',
    calories: 280,
    icon: <Coffee className="h-5 w-5" />,
    time: 'Snack',
    color: 'bg-purple-50 dark:bg-purple-900/20',
  },
];

const MealsList = () => {
  return (
    <FadeIn delay={0.3}>
      <GlassmorphicCard className="p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-medium">Today's Meals</h3>
          <button className="text-xs text-health-primary hover:text-health-primary/80 transition-colors">
            View all
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mealItems.map((meal, index) => (
            <MealItem 
              key={meal.id}
              id={meal.id}
              name={meal.name}
              calories={meal.calories}
              icon={meal.icon}
              time={meal.time}
              color={meal.color}
              index={index}
            />
          ))}
        </div>
      </GlassmorphicCard>
    </FadeIn>
  );
};

export default MealsList;
