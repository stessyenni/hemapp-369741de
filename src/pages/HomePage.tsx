
import { useAuth } from '@/components/auth/AuthProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { Heart, Target, Utensils, MapPin, MessageSquare, User, LogOut } from 'lucide-react'

const HomePage = () => {
  const { user, signOut } = useAuth()

  const features = [
    {
      title: 'Health Goals',
      description: 'Track and manage your health objectives',
      icon: Target,
      path: '/goals',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Diet Tracking',
      description: 'Monitor your nutrition and eating habits',
      icon: Utensils,
      path: '/diet',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Health Facilities',
      description: 'Find nearby medical facilities',
      icon: MapPin,
      path: '/facilities',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Health Chat',
      description: 'Get health advice and support',
      icon: MessageSquare,
      path: '/chat',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      title: 'Profile',
      description: 'Manage your personal information',
      icon: User,
      path: '/profile',
      color: 'bg-pink-50 text-pink-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-500 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">HemApp</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Health Journey Starts Here
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your health goals, track your diet, find medical facilities, and get personalized health advice all in one place.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link key={feature.path} to={feature.path}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default HomePage
