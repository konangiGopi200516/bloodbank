import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import OTPLogin from "./pages/Auth/OTPLogin";
import SignUp from "./pages/Auth/SignUp";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import BloodSearch from "./pages/BloodSearch";
import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/otp-login",
    element: <OTPLogin />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/search",
    element: <BloodSearch />,
  },
  {
    path: "/hospitals",
    element: <BloodSearch />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/feedback",
    element: <Feedback />,
  },
  {
    path: "/find-blood",
    element: <BloodSearch />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
