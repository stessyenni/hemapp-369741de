
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { 
  HeartIcon, 
  UserPlusIcon,
  LogInIcon,
  EyeIcon,
  EyeOffIcon,
  ShieldCheckIcon,
  StarIcon,
  CheckCircleIcon
} from "lucide-react";

const MobileAuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        
        if (password.length < 6) {
          toast.error("Password must be at least 6 characters long");
          return;
        }
        
        const { error } = await signUp(email, password, firstName, lastName);
        if (error) {
          toast.error(error.message || "Error creating account");
        } else {
          toast.success("Account created! Please check your email to verify your account.");
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error.message || "Error signing in");
        } else {
          toast.success("Signed in successfully!");
          navigate("/dashboard");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <HeartIcon className="h-5 w-5 text-red-500" />,
      title: "Health Monitoring",
      description: "Track your vital health metrics"
    },
    {
      icon: <ShieldCheckIcon className="h-5 w-5 text-green-500" />,
      title: "Secure & Private",
      description: "Your data is encrypted and protected"
    },
    {
      icon: <StarIcon className="h-5 w-5 text-yellow-500" />,
      title: "AI-Powered",
      description: "Get personalized recommendations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 flex flex-col">
      {/* Mobile Header */}
      <div className="w-full bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mr-3">
            <HeartIcon className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-2xl">HemApp</span>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">
            Your Personal Health Companion
          </h1>
          <p className="text-white/90">
            Monitor, track, and optimize your health journey
          </p>
        </div>
      </div>

      {/* Features Preview */}
      <div className="px-6 py-4 bg-white/80">
        <div className="flex justify-between space-x-2">
          {features.map((feature, index) => (
            <div key={index} className="flex-1 text-center">
              <div className="flex justify-center mb-2">
                {feature.icon}
              </div>
              <h3 className="text-xs font-semibold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-xs text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Auth Form */}
      <div className="flex-1 px-6 py-6">
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl font-bold flex items-center justify-center space-x-2">
              {isSignUp ? (
                <>
                  <UserPlusIcon className="h-5 w-5 text-green-600" />
                  <span>Create Account</span>
                </>
              ) : (
                <>
                  <LogInIcon className="h-5 w-5 text-blue-600" />
                  <span>Welcome Back</span>
                </>
              )}
            </CardTitle>
            <CardDescription className="text-sm">
              {isSignUp 
                ? "Join thousands of users managing their health" 
                : "Sign in to continue your health journey"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                    className="pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </button>
                </div>
                {isSignUp && (
                  <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                )}
              </div>
              
              {isSignUp && (
                <div>
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Confirm your password"
                      className="pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full h-11 text-base font-medium bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 hover:opacity-90 transition-opacity"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  isSignUp ? "Create Account" : "Sign In"
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");
                  setFirstName("");
                  setLastName("");
                }}
                className="mt-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                {isSignUp ? "Sign in instead" : "Create an account"}
              </button>
            </div>

            {isSignUp && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-green-700">
                    <p className="font-medium mb-1">What you get:</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      <li>Personal health dashboard</li>
                      <li>AI health recommendations</li>
                      <li>Secure data storage</li>
                      <li>Progress tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {isSignUp && (
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 leading-relaxed">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MobileAuthForm;
