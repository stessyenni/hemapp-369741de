
import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/integrations/supabase/client'
import { ArrowLeft, Plus, Utensils } from 'lucide-react'
import { Link } from 'react-router-dom'

interface DietEntry {
  id: string
  meal_name: string
  meal_type?: string
  calories?: number
  protein?: string
  fiber?: string
  logged_at: string
}

const DietPage = () => {
  const { user } = useAuth()
  const [entries, setEntries] = useState<DietEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newEntry, setNewEntry] = useState({
    meal_name: '',
    meal_type: 'breakfast',
    calories: '',
    protein: '',
    fiber: ''
  })

  useEffect(() => {
    fetchEntries()
  }, [user])

  const fetchEntries = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('diet_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('logged_at', { ascending: false })

    if (error) {
      console.error('Error fetching diet entries:', error)
    } else {
      setEntries(data || [])
    }
    setLoading(false)
  }

  const createEntry = async () => {
    if (!user || !newEntry.meal_name) return

    const { error } = await supabase
      .from('diet_entries')
      .insert([{
        user_id: user.id,
        meal_name: newEntry.meal_name,
        meal_type: newEntry.meal_type,
        calories: newEntry.calories ? parseInt(newEntry.calories) : null,
        protein: newEntry.protein || null,
        fiber: newEntry.fiber || null
      }])

    if (error) {
      console.error('Error creating diet entry:', error)
    } else {
      setNewEntry({ meal_name: '', meal_type: 'breakfast', calories: '', protein: '', fiber: '' })
      setShowForm(false)
      fetchEntries()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Log Meal
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Diet Tracking</h1>
          <p className="text-gray-600">Monitor your nutrition and eating habits</p>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Log New Meal</CardTitle>
              <CardDescription>Record what you ate and nutritional information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Meal name"
                value={newEntry.meal_name}
                onChange={(e) => setNewEntry({ ...newEntry, meal_name: e.target.value })}
              />
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newEntry.meal_type}
                onChange={(e) => setNewEntry({ ...newEntry, meal_type: e.target.value })}
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  type="number"
                  placeholder="Calories"
                  value={newEntry.calories}
                  onChange={(e) => setNewEntry({ ...newEntry, calories: e.target.value })}
                />
                <Input
                  placeholder="Protein (g)"
                  value={newEntry.protein}
                  onChange={(e) => setNewEntry({ ...newEntry, protein: e.target.value })}
                />
                <Input
                  placeholder="Fiber (g)"
                  value={newEntry.fiber}
                  onChange={(e) => setNewEntry({ ...newEntry, fiber: e.target.value })}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={createEntry}>Log Meal</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Utensils className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">{entry.meal_name}</CardTitle>
                </div>
                <CardDescription>
                  {entry.meal_type && (
                    <span className="capitalize bg-gray-100 px-2 py-1 rounded-full text-xs">
                      {entry.meal_type}
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {entry.calories && (
                    <p className="text-sm text-gray-600">Calories: {entry.calories}</p>
                  )}
                  {entry.protein && (
                    <p className="text-sm text-gray-600">Protein: {entry.protein}g</p>
                  )}
                  {entry.fiber && (
                    <p className="text-sm text-gray-600">Fiber: {entry.fiber}g</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {new Date(entry.logged_at).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {entries.length === 0 && !showForm && (
          <div className="text-center py-12">
            <Utensils className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No meals logged yet</h3>
            <p className="mt-1 text-sm text-gray-500">Start tracking your nutrition by logging your first meal.</p>
            <div className="mt-6">
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Log Meal
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default DietPage
