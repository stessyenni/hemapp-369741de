
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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

const NutritionChart = () => {
  return (
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
  );
};

export default NutritionChart;
