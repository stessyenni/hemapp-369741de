
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Diet = () => {
  const [mealName, setMealName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Meal logged successfully! AI analysis will be available soon.");
    setMealName("");
    setDescription("");
    setImageFile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Diet Monitoring</h1>
          <p className="text-gray-600">Log your meals and get AI-powered nutrition insights</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Log New Meal</CardTitle>
              <CardDescription>
                Upload a photo or describe your meal for AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="mealName">Meal Name</Label>
                  <Input
                    id="mealName"
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                    placeholder="e.g., Breakfast, Lunch, Dinner"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what you ate..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">Upload Photo</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Log Meal & Analyze
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Meals</CardTitle>
              <CardDescription>Your meal history and nutrition tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Grilled Chicken Salad</h4>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Mixed greens, grilled chicken breast, cherry tomatoes, cucumber
                  </p>
                  <div className="text-sm">
                    <span className="font-medium text-green-600">Calories: 350</span>
                    <span className="mx-2">•</span>
                    <span>Protein: 35g</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Oatmeal with Berries</h4>
                    <span className="text-sm text-gray-500">8 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Steel-cut oats, blueberries, strawberries, honey
                  </p>
                  <div className="text-sm">
                    <span className="font-medium text-green-600">Calories: 285</span>
                    <span className="mx-2">•</span>
                    <span>Fiber: 8g</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Today's Nutrition Summary</CardTitle>
            <CardDescription>Track your daily nutritional goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">1,247</div>
                <div className="text-sm text-gray-600">Calories</div>
                <div className="text-xs text-gray-500">Goal: 1,800</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">85g</div>
                <div className="text-sm text-gray-600">Protein</div>
                <div className="text-xs text-gray-500">Goal: 120g</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">145g</div>
                <div className="text-sm text-gray-600">Carbs</div>
                <div className="text-xs text-gray-500">Goal: 200g</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">32g</div>
                <div className="text-sm text-gray-600">Fat</div>
                <div className="text-xs text-gray-500">Goal: 60g</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Diet;
