
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/integrations/supabase/client'
import { ArrowLeft, MapPin, Phone, Clock, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Facility {
  id: string
  name: string
  type: string
  address: string
  phone?: string
  hours?: string
  rating?: number
  distance?: string
  specialties?: string[]
}

const FacilitiesPage = () => {
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFacilities()
  }, [])

  const fetchFacilities = async () => {
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching facilities:', error)
    } else {
      setFacilities(data || [])
    }
    setLoading(false)
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
          <div className="flex items-center h-16">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Facilities</h1>
          <p className="text-gray-600">Find nearby medical facilities and healthcare providers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <Card key={facility.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-lg">{facility.name}</CardTitle>
                </div>
                <CardDescription>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                    {facility.type}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{facility.address}</p>
                  </div>
                  
                  {facility.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-600">{facility.phone}</p>
                    </div>
                  )}
                  
                  {facility.hours && (
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-600">{facility.hours}</p>
                    </div>
                  )}
                  
                  {facility.rating && (
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <p className="text-sm text-gray-600">{facility.rating}/5.0</p>
                    </div>
                  )}
                  
                  {facility.distance && (
                    <p className="text-sm text-blue-600 font-medium">{facility.distance}</p>
                  )}
                  
                  {facility.specialties && facility.specialties.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Specialties:</p>
                      <div className="flex flex-wrap gap-1">
                        {facility.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {facilities.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No facilities found</h3>
            <p className="mt-1 text-sm text-gray-500">Check back later for updated facility information.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default FacilitiesPage
