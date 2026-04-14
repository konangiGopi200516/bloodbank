import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Heart, Mail, Phone, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { authService, OTPRequest, OTPVerifyRequest } from "@/services/authService";
import Navbar from "@/components/Layout/Navbar";

const OTPLogin = () => {
  const [step, setStep] = useState<"input" | "otp" | "success">("input");
  const [loginMethod, setLoginMethod] = useState<"email" | "mobile">("email");
  const [contactInfo, setContactInfo] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  // Clear OTP state when component mounts or step changes
  useEffect(() => {
    if (step === "input") {
      setOtp("");
    }
  }, [step]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo.trim()) return;

    setIsLoading(true);
    // Clear any previous OTP
    setOtp("");
    
    try {
      const otpRequest: OTPRequest = {
        contact: contactInfo,
        type: loginMethod
      };
      
      const response = await authService.sendOTP(otpRequest);
      
      toast({
        title: "OTP Sent!",
        description: response.message,
      });
      
      // Show OTP in development mode if available
      if (response.otp) {
        toast({
          title: "Development Mode - OTP Generated",
          description: `Your OTP is: ${response.otp}`,
        });
      } else {
        toast({
          title: "Development Mode",
          description: `Check backend console for OTP (Twilio not configured)`,
        });
      }
      
      setStep("otp");
      // Ensure OTP input is completely empty
      setOtp("");
    } catch (error: any) {
      toast({
        title: "Failed to Send OTP",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return;

    setIsLoading(true);

    try {
      const verifyRequest: OTPVerifyRequest = {
        contact: contactInfo,
        type: loginMethod,
        otp: otp
      };
      
      const response = await authService.verifyOTP(verifyRequest);
      
      // Update user context with real data
      const userData = {
        id: response.token.id.toString(),
        name: `${response.token.firstName} ${response.token.lastName}`,
        email: response.token.email,
        phone: response.token.phone,
        bloodType: response.token.bloodType,
        avatar: ""
      };
      
      login(userData);
      
      toast({
        title: "Login Successful!",
        description: response.message,
      });

      setStep("success");
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error: any) {
      toast({
        title: "OTP Verification Failed",
        description: error.message || "Invalid or expired OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    // Clear previous OTP
    setOtp("");
    
    try {
      const otpRequest: OTPRequest = {
        contact: contactInfo,
        type: loginMethod
      };
      
      const response = await authService.sendOTP(otpRequest);
      
      toast({
        title: "OTP Resent!",
        description: response.message,
      });
      
      // Show OTP in development mode if available
      if (response.otp) {
        toast({
          title: "Development Mode - OTP Generated",
          description: `Your OTP is: ${response.otp}`,
        });
      } else {
        toast({
          title: "Development Mode",
          description: `Check backend console for OTP (Twilio not configured)`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Failed to Resend OTP",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateInput = () => {
    if (loginMethod === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo);
    } else {
      return /^[\+]?[1-9][\d]{0,15}$/.test(contactInfo);
    }
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md medical-card text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Login Successful!</h2>
              <p className="text-muted-foreground mb-4">
                Redirecting you to your dashboard...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md medical-card">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
              <Heart className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {step === "input" ? "Sign In with OTP" : "Verify OTP"}
            </CardTitle>
            <CardDescription>
              {step === "input" 
                ? "Enter your email or phone number to receive OTP"
                : `Enter the 6-digit code sent to your ${loginMethod === "email" ? "email" : "phone"}`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "input" ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as "email" | "mobile")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email" className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </TabsTrigger>
                    <TabsTrigger value="mobile" className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>Mobile</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="email" className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      required
                    />
                  </TabsContent>
                  
                  <TabsContent value="mobile" className="space-y-2">
                    <Label htmlFor="mobile">Phone Number</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      required
                    />
                  </TabsContent>
                </Tabs>

                <Button 
                  type="submit" 
                  className="w-full btn-hero" 
                  disabled={!validateInput() || isLoading}
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-center block">Enter Verification Code</Label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp || ""}
                      onChange={(value) => setOtp(value)}
                      onComplete={() => handleVerifyOTP()}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <div className="text-center text-sm">
                  <p className="text-muted-foreground mb-2">
                    Code sent to: <strong>{contactInfo}</strong>
                  </p>
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={handleResendOTP}
                    className="text-primary"
                  >
                    Didn't receive code? Resend
                  </Button>
                </div>

                <Button
                  onClick={handleVerifyOTP}
                  className="w-full btn-hero"
                  disabled={otp.length !== 6 || isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify & Login"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setStep("input");
                    setOtp("");
                  }}
                  className="w-full"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login Method
                </Button>
              </div>
            )}

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-primary">
                Use password instead
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OTPLogin;