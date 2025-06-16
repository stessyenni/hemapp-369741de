
import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/integrations/supabase/client'
import { ArrowLeft, Plus, Target } from 'lucide-react'
import { Link } from 'react-router-dom'

interface HealthGoal {
  id: string
  title: string
  description?: string
  target_value?: string
  current_value?: string
  progress: number
  status: string
  deadline?: string
  created_at: string
}

const GoalsPage = () => {
  const { user } = useAuth()
  const [goals, setGoals] = useState<HealthGoal[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target_value: '',
    deadline: ''
  })

  useEffect(() => {
    fetchGoals()
  }, [user])

  const fetchGoals = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('health_goals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching goals:', error)
    } else {
      setGoals(data || [])
    }
    setLoading(false)
  }

  const createGoal = async () => {
    if (!user || !newGoal.title) return

    const { error } = await supabase
      .from('health_goals')
      .insert([{
        user_id: user.id,
        title: newGoal.title,
        description: newGoal.description,
        target_value: newGoal.target_value,
        deadline: newGoal.deadline || null
      }])

    if (error) {
      console.error('Error creating goal:', error)
    } else {
      setNewGoal({ title: '', description: '', target_value: '', deadline: '' })
      setShowForm(false)
      fetchGoals()
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
              New Goal
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Goals</h1>
          <p className="text-gray-600">Track and manage your health objectives</p>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Goal</CardTitle>
              <CardDescription>Set a new health goal to track your progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Goal title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              />
              <Input
                placeholder="Description (optional)"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              />
              <Input
                placeholder="Target value (e.g., 10,000 steps)"
                value={newGoal.target_value}
                onChange={(e) => setNewGoal({ ...newGoal, target_value: e.target.value })}
              />
              <Input
                type="date"
                placeholder="Deadline (optional)"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              />
              <div className="flex space-x-2">
                <Button onClick={createGoal}>Create Goal</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <Card key={goal.id}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                </div>
                {goal.description && (
                  <CardDescription>{goal.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {goal.target_value && (
                    <div>
                      <p className="text-sm text-gray-600">Target: {goal.target_value}</p>
                    </div>
                  )}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(goal.progress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{goal.progress}% complete</p>
                  {goal.deadline && (
                    <p className="text-sm text-gray-600">
                      Deadline: {new Date(goal.deadline).toLocaleDateString()}
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      goal.status === 'active' ? 'bg-green-100 text-green-800' :
                      goal.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {goal.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {goals.length === 0 && !showForm && (
          <div className="text-center py-12">
            <Target className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No goals yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first health goal.</p>
            <div className="mt-6">
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Goal
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default GoalsPage
