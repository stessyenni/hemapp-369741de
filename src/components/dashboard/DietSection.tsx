
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Apple, Carrot, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassmorphicCard from '@/components/ui-elements/GlassmorphicCard';
import FadeIn from '@/components/animations/FadeIn';

// Sample data
const nutritionData = [
  { day: 'Mon', calories: 2100, protein: 120, carbs: 180, fat: 60 },
  { day: 'Tue', calories: 1950, protein: 115, carbs: 160, fat: 55 },
  { day: 'Wed', calories: 2200, protein: 130, carbs: 190, fat: 65 },
  { day: 'Thu', calories: 2050, protein: 125, carbs: 170, fat: 60 },
  { day: 'Fri', calories: 2150, protein: 128, carbs: 175, fat: 62 },
  { day: 'Sat', calories: 1900, protein: 110, carbs: 150, fat: 50 },
  { day: 'Sun', calories: 2000, protein: 120, carbs: 165, fat: 58 },
];

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

interface MacroCircleProps {
  value: number;
  max: number;
  label: string;
  color: string;
  className?: string;
}

const MacroCircle = ({ value, max, label, color, className }: MacroCircleProps) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/30"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${percentage * 2.51} 251`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
          {value}g
        </div>
      </div>
      <span className="mt-2 text-xs text-muted-foreground">{label}</span>
    </div>
  );
};

const DietSection = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FadeIn delay={0.1} className="lg:col-span-2">
          <GlassmorphicCard className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Nutrition Tracking</h3>
              <div className="text-xs text-muted-foreground">Last 7 days</div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nutritionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis hide={true} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="glass-card p-3 text-xs">
                            <p className="font-medium">{label}</p>
                            <p className="text-health-primary">{`Calories: ${payload[0].value}`}</p>
                            <p className="text-health-secondary">{`Protein: ${payload[1].value}g`}</p>
                            <p className="text-blue-500">{`Carbs: ${payload[2].value}g`}</p>
                            <p className="text-amber-500">{`Fat: ${payload[3].value}g`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="calories" fill="hsl(var(--health-primary)/0.7)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="protein" fill="hsl(var(--health-secondary)/0.7)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="carbs" fill="hsl(221, 83%, 70%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="fat" fill="hsl(36, 100%, 65%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassmorphicCard>
        </FadeIn>

        <FadeIn delay={0.2}>
          <GlassmorphicCard className="p-6 h-full">
            <h3 className="font-medium mb-4">Today's Macros</h3>
            <div className="mt-2 mb-6">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <div className="text-3xl font-bold">1,864</div>
                <div className="text-sm text-muted-foreground">calories</div>
              </div>
              <div className="w-full bg-muted/30 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-health-primary rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0</span>
                <span>Goal: 2,400</span>
              </div>
            </div>
            
            <div className="flex justify-around mt-8">
              <MacroCircle 
                value={118} 
                max={150} 
                label="Protein" 
                color="hsl(var(--health-secondary))" 
              />
              <MacroCircle 
                value={162} 
                max={240} 
                label="Carbs" 
                color="hsl(221, 83%, 70%)" 
              />
              <MacroCircle 
                value={54} 
                max={80} 
                label="Fat" 
                color="hsl(36, 100%, 65%)" 
              />
            </div>
          </GlassmorphicCard>
        </FadeIn>
      </div>

      <div className="mt-6">
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
                <FadeIn key={meal.id} delay={0.1 * (index + 1)}>
                  <div className={cn("p-4 rounded-lg transition-all duration-300 hover:translate-y-[-2px]", meal.color)}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">{meal.time}</div>
                        <div className="font-medium">{meal.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{meal.calories} calories</div>
                      </div>
                      <div className="text-health-primary">{meal.icon}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </GlassmorphicCard>
        </FadeIn>
      </div>
    </div>
  );
};

export default DietSection;
