
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapIcon } from "lucide-react";

const Maps = () => {
  const healthFacilities = [
    {
      name: "General Hospital",
      type: "Hospital",
      distance: "0.8 km",
      rating: "4.2",
      phone: "+123456789",
    },
    {
      name: "City Medical Center",
      type: "Medical Center",
      distance: "1.2 km", 
      rating: "4.5",
      phone: "+123456790",
    },
    {
      name: "Family Clinic",
      type: "Clinic",
      distance: "0.5 km",
      rating: "4.0",
      phone: "+123456791",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Facilities</h1>
          <p className="text-gray-600">Find nearby hospitals, clinics, and medical centers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapIcon className="h-5 w-5 mr-2" />
                Interactive Map
              </CardTitle>
              <CardDescription>
                Map view will be integrated with Google Maps API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapIcon className="h-12 w-12 mx-auto mb-2" />
                  <p>Map Integration Coming Soon</p>
                  <p className="text-sm">Google Maps with health facility markers</p>
                </div>
              </div>
              <div className="mt-4">
                <Input placeholder="Search for specific facility or location..." />
                <Button className="w-full mt-2 bg-green-600 hover:bg-green-700">
                  Search Facilities
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nearby Facilities</CardTitle>
              <CardDescription>
                Health facilities within 5km of your location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthFacilities.map((facility, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{facility.name}</h4>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        {facility.distance}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{facility.type}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">★ {facility.rating}</span>
                        <span className="text-sm text-gray-600">{facility.phone}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Get Directions
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <h4 className="font-medium text-green-600 mb-2">Emergency</h4>
              <p className="text-2xl font-bold">911</p>
              <Button className="w-full mt-2 bg-red-600 hover:bg-red-700">
                Call Emergency
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <h4 className="font-medium text-blue-600 mb-2">Telehealth</h4>
              <p className="text-sm text-gray-600 mb-2">Available 24/7</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Start Consultation
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <h4 className="font-medium text-purple-600 mb-2">Appointments</h4>
              <p className="text-sm text-gray-600 mb-2">Book online</p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Schedule Visit
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Maps;
