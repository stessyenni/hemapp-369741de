
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  TargetIcon, 
  TrendingUpIcon, 
  CalendarIcon, 
  HeartIcon, 
  ActivityIcon,
  DropletIcon,
  ClockIcon,
  AwardIcon
} from "lucide-react";
import AppHeader from "@/components/AppHeader";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [healthScore, setHealthScore] = useState(78);
  const [waterIntake, setWaterIntake] = useState(1.5);
  const [todaySteps, setTodaySteps] = useState(7842);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const healthMetrics = [
    {
      title: "Today's Calories",
      value: "1,247",
      target: "2,000",
      progress: 62,
      icon: <TargetIcon className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%"
    },
    {
      title: "Weight Progress",
      value: "68.2 kg",
      target: "65.0 kg",
      progress: 85,
      icon: <TrendingUpIcon className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "-0.5kg"
    },
    {
      title: "Daily Steps",
      value: todaySteps.toLocaleString(),
      target: "10,000",
      progress: 78,
      icon: <ActivityIcon className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+15%"
    },
    {
      title: "Water Intake",
      value: `${waterIntake}L`,
      target: "2.5L",
      progress: 60,
      icon: <DropletIcon className="h-5 w-5" />,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      change: "60%"
    }
  ];

  const quickActions = [
    {
      title: "Log Your Meal",
      description: "Track your nutrition",
      action: () => navigate("/diet"),
      color: "nature-gradient",
      icon: <TargetIcon className="h-5 w-5" />
    },
    {
      title: "Update Goals",
      description: "Modify health targets",
      action: () => navigate("/goals"),
      color: "royal-gradient",
      icon: <AwardIcon className="h-5 w-5" />
    },
    {
      title: "AI Assistant",
      description: "Get health advice",
      action: () => navigate("/chat"),
      color: "purple-gradient",
      icon: <HeartIcon className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <AppHeader />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Welcome Section */}
        <div className="fade-in">
          <div className="health-gradient rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
                  <p className="text-white/90 text-lg">
                    {currentTime.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/80 flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {currentTime.toLocaleTimeString()}
                  </div>
                  <div className="mt-2">
                    <Badge className="bg-white/20 text-white border-white/30">
                      Health Score: {healthScore}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>

        {/* Health Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in">
          {healthMetrics.map((metric, index) => (
            <Card key={index} className="scale-hover border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <div className={metric.color}>{metric.icon}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {metric.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>{metric.target}</span>
                    </div>
                    <Progress value={metric.progress} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions and Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-2 scale-hover border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Quick Actions</CardTitle>
              <CardDescription>Manage your health journey</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.action}
                  className={`${action.color} h-24 flex-col space-y-2 text-white border-0 hover:scale-105 transition-transform`}
                >
                  {action.icon}
                  <div className="text-center">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs opacity-90">{action.description}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Today's Summary */}
          <Card className="scale-hover border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
                <span>Today's Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Meals logged</span>
                  <Badge className="bg-green-100 text-green-800">2 of 3</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Water intake</span>
                  <Badge className="bg-blue-100 text-blue-800">{waterIntake}L / 2.5L</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Exercise</span>
                  <Badge className="bg-purple-100 text-purple-800">30 min</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sleep quality</span>
                  <Badge className="bg-indigo-100 text-indigo-800">Good</Badge>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate("/profile")} 
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                View Full Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="fade-in scale-hover border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest health activities and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { activity: "Logged breakfast - Oatmeal with berries", time: "2 hours ago", type: "diet" },
                { activity: "Completed 30min workout", time: "4 hours ago", type: "exercise" },
                { activity: "Reached daily water goal", time: "6 hours ago", type: "hydration" },
                { activity: "Updated weight - 68.2kg", time: "1 day ago", type: "tracking" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${
                    item.type === 'diet' ? 'bg-green-500' :
                    item.type === 'exercise' ? 'bg-blue-500' :
                    item.type === 'hydration' ? 'bg-cyan-500' : 'bg-purple-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.activity}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
