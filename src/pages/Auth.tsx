
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import MobileAuthForm from "@/components/MobileAuthForm";

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // For now, we'll show the mobile-optimized form on all devices
  // You can add responsive design later to show different layouts
  return <MobileAuthForm />;
};

export default Auth;
