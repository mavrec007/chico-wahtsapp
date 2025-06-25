import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/hooks/useTheme";
import { AuthLayout } from "@/layouts/AuthLayout";
import LoadingOverlay from "@/components/LoadingOverlay";
import RouteChangeListener from "@/components/RouteChangeListener";
import Layout from "./components/layout/Layout";
import Landing from "./pages/Landing";
import LoginPage from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard"; 
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Settings from "./pages/Settings";
import Bookings from "./pages/Bookings";
import Activities from "./pages/Activities";
import Swimming from "./pages/Swimming";
import Fields from "./pages/Fields";
import Clients from "./pages/Clients";
import Players from "./pages/Players";
import Coaches from "./pages/Coaches";
import Facilities from "./pages/Facilities";
import Payments from "./pages/Payments";
import CoachAssignments from "./pages/CoachAssignments";
import SwimmingSchools from "./pages/swimming/Schools";
import SwimmingPrivate from "./pages/swimming/Private";
import SwimmingFreeTime from "./pages/swimming/FreeTime";
import FootballAcademy from "./pages/football/Academy";
import FootballSchools from "./pages/football/Schools";
import FootballFields from "./pages/football/Fields";
import CollectionsPage from "./pages/finance/Collections";
import PricingPage from "./pages/finance/Pricing";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from '@/context/LanguageContext';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LoadingOverlay />
        <AuthProvider>
          <LanguageProvider>
            <BrowserRouter>
              <RouteChangeListener />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                 
                {/* Main Management Routes */}
                <Route path="/dashboard" element={
                  <AuthLayout>
                    <Layout><Dashboard /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/coaches" element={
                  <AuthLayout>
                    <Layout><Coaches /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/players" element={
                  <AuthLayout>
                    <Layout><Players /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/facilities" element={
                  <AuthLayout>
                    <Layout><Facilities /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/payments" element={
                  <AuthLayout>
                    <Layout><Payments /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/coach-assignments" element={
                  <AuthLayout>
                    <Layout><CoachAssignments /></Layout>
                  </AuthLayout>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={
                  <AuthLayout>
                    <Layout><AdminDashboard /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/bookings" element={
                  <AuthLayout>
                    <Layout><Bookings /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/activities" element={
                  <AuthLayout>
                    <Layout><Activities /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/activities/swimming" element={
                  <AuthLayout>
                    <Layout><Swimming /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/activities/fields" element={
                  <AuthLayout>
                    <Layout><Fields /></Layout>
                  </AuthLayout>
                } />

                {/* Swimming Sub Routes */}
                <Route path="/swimming/schools" element={
                  <AuthLayout>
                    <Layout><SwimmingSchools /></Layout>
                  </AuthLayout>
                } />
                <Route path="/swimming/private" element={
                  <AuthLayout>
                    <Layout><SwimmingPrivate /></Layout>
                  </AuthLayout>
                } />
                <Route path="/swimming/free-time" element={
                  <AuthLayout>
                    <Layout><SwimmingFreeTime /></Layout>
                  </AuthLayout>
                } />

                {/* Football Section */}
                <Route path="/football/academy" element={
                  <AuthLayout>
                    <Layout><FootballAcademy /></Layout>
                  </AuthLayout>
                } />
                <Route path="/football/schools" element={
                  <AuthLayout>
                    <Layout><FootballSchools /></Layout>
                  </AuthLayout>
                } />
                <Route path="/football/fields" element={
                  <AuthLayout>
                    <Layout><FootballFields /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/clients" element={
                  <AuthLayout requiredRole="manager">
                    <Layout><Clients /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/admin/clients" element={
                  <AuthLayout requiredRole="admin">
                    <Layout><Clients /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/admin/field-activities" element={
                  <AuthLayout requiredRole="admin">
                    <Layout><Fields /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/admin/swimming-activities" element={
                  <AuthLayout requiredRole="admin">
                    <Layout><Swimming /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/admin/bookings/pending" element={
                  <AuthLayout requiredRole="admin">
                    <Layout><Bookings /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/admin/bookings/confirmed" element={
                  <AuthLayout requiredRole="admin">
                    <Layout><Bookings /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/admin/payments" element={
                  <AuthLayout requiredRole="admin">
                    <Layout><Dashboard /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/admin/reports" element={
                  <AuthLayout requiredRole="admin">
                    <Layout><Dashboard /></Layout>
                  </AuthLayout>
                } />

                {/* Financial Affairs */}
                <Route path="/finance/collections" element={
                  <AuthLayout>
                    <Layout><CollectionsPage /></Layout>
                  </AuthLayout>
                } />
                <Route path="/finance/pricing" element={
                  <AuthLayout>
                    <Layout><PricingPage /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/users" element={
                  <AuthLayout requiredRole="admin">
                    <Layout><Users /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/roles" element={
                  <AuthLayout requiredRole="admin">
                    <Layout><Roles /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/reports" element={
                  <AuthLayout requiredRole="manager">
                    <Layout><Dashboard /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="/settings" element={
                  <AuthLayout>
                    <Layout><Settings /></Layout>
                  </AuthLayout>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </LanguageProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
