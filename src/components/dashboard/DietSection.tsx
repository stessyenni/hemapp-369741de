
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Utensils, Plus, Loader2 } from 'lucide-react';
import { useSupabaseData, useSupabaseInsert } from '@/hooks/useSupabaseData';
import { useAuth } from '@/contexts/AuthContext';
import type { Database } from '@/integrations/supabase/types';

type DietEntry = Database['public']['Tables']['diet_entries']['Row'];

const DietSection = () => {
  const { user } = useAuth();
  const { data: dietEntries, loading, refetch } = useSupabaseData('diet_entries');
  const { insert, loading: inserting } = useSupabaseInsert('diet_entries');

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    meal_name: '',
    meal_type: 'breakfast',
    calories: '',
    protein: '',
    fiber: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await insert({
      meal_name: formData.meal_name,
      meal_type: formData.meal_type,
      calories: parseInt(formData.calories) || null,
      protein: formData.protein || null,
      fiber: formData.fiber || null,
    });

    if (!error) {
      setFormData({
        meal_name: '',
        meal_type: 'breakfast',
        calories: '',
        protein: '',
        fiber: '',
      });
      setShowForm(false);
      refetch();
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Please sign in to track your diet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Diet Tracking
              </CardTitle>
              <CardDescription>
                Track your meals and nutrition throughout the day
              </CardDescription>
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Meal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 bg-muted rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meal_name">Meal Name</Label>
                  <Input
                    id="meal_name"
                    value={formData.meal_name}
                    onChange={(e) => setFormData({ ...formData, meal_name: e.target.value })}
                    placeholder="e.g., Grilled Chicken Salad"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meal_type">Meal Type</Label>
                  <Select
                    value={formData.meal_type}
                    onValueChange={(value) => setFormData({ ...formData, meal_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calories">Calories</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={formData.calories}
                    onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                    placeholder="300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    value={formData.protein}
                    onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
                    placeholder="25"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fiber">Fiber (g)</Label>
                  <Input
                    id="fiber"
                    value={formData.fiber}
                    onChange={(e) => setFormData({ ...formData, fiber: e.target.value })}
                    placeholder="5"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={inserting}>
                  {inserting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add Meal'
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : dietEntries.length > 0 ? (
            <div className="space-y-3">
              {dietEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <h4 className="font-medium">{entry.meal_name}</h4>
                    <p className="text-sm text-muted-foreground capitalize">
                      {entry.meal_type} • {entry.calories ? `${entry.calories} cal` : 'No calories logged'}
                    </p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    {new Date(entry.logged_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No meals logged yet. Add your first meal to get started!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DietSection;
