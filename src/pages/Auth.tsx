
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { 
  HeartIcon, 
  ShieldCheckIcon, 
  StarIcon,
  UserPlusIcon,
  LogInIcon,
  EyeIcon,
  EyeOffIcon
} from "lucide-react";

const Auth = () => {
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

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

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
      icon: <HeartIcon className="h-6 w-6 text-red-500" />,
      title: "Health Monitoring",
      description: "Track your vital health metrics and progress"
    },
    {
      icon: <ShieldCheckIcon className="h-6 w-6 text-green-500" />,
      title: "Secure & Private",
      description: "Your health data is encrypted and protected"
    },
    {
      icon: <StarIcon className="h-6 w-6 text-yellow-500" />,
      title: "AI-Powered Insights",
      description: "Get personalized health recommendations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 flex">
      {/* Left Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative">
        <div className="flex flex-col justify-center px-12 xl:px-16 w-full">
          {/* Logo and Brand */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl health-gradient flex items-center justify-center">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-3xl bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent">
                HemApp
              </span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Your Personal Health
              <span className="text-green-600"> Companion</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Monitor your health, track your diet, and get AI-powered insights to live your best life.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                <div className="flex-shrink-0 p-2 rounded-lg bg-white shadow-sm">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-12 p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30">
            <div className="flex items-center space-x-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 italic mb-3">
              "HemApp has completely transformed how I manage my health. The AI insights are incredibly helpful!"
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                <span className="text-white font-medium text-sm">SJ</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Sarah Johnson</p>
                <p className="text-sm text-gray-600">Health Enthusiast</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-gradient-to-br from-green-200 to-blue-200 opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="w-12 h-12 rounded-xl health-gradient flex items-center justify-center mr-3">
              <HeartIcon className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent">
              HemApp
            </span>
          </div>

          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold flex items-center justify-center space-x-2">
                {isSignUp ? (
                  <>
                    <UserPlusIcon className="h-6 w-6 text-green-600" />
                    <span>Create Account</span>
                  </>
                ) : (
                  <>
                    <LogInIcon className="h-6 w-6 text-blue-600" />
                    <span>Welcome Back</span>
                  </>
                )}
              </CardTitle>
              <CardDescription className="text-base">
                {isSignUp 
                  ? "Join thousands of users taking control of their health" 
                  : "Sign in to continue your health journey"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {isSignUp && (
                  <div className="grid grid-cols-2 gap-4">
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
                  className="w-full h-12 text-base font-medium royal-gradient hover:opacity-90 transition-opacity"
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
                <div className="mt-6 text-center">
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
    </div>
  );
};

export default Auth;
