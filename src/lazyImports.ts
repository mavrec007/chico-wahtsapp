
import React, { Suspense } from 'react';
import App from './App';

const LoadingOverlay = React.lazy(() => import('@/components/LoadingOverlay'));
const RouteChangeListener = React.lazy(() => import('@/components/RouteChangeListener'));
const AuthForms = React.lazy(() => import('@/components/auth/AuthForms'));
const AuthModal = React.lazy(() => import('@/components/auth/AuthModal'));
const LoginForm = React.lazy(() => import('@/components/auth/LoginForm'));
const ProtectedRoute = React.lazy(() => import('@/components/auth/ProtectedRoute'));
const RegisterForm = React.lazy(() => import('@/components/auth/RegisterForm'));
const BookingModal = React.lazy(() => import('@/components/bookings/BookingModal'));
const BookingsManagement = React.lazy(() => import('@/components/bookings/BookingsManagement'));
const FacilitiesManagement = React.lazy(() => import('@/components/facilities/FacilitiesManagement'));
const FacilityModal = React.lazy(() => import('@/components/facilities/FacilityModal'));
const ActivityForm = React.lazy(() => import('@/components/forms/ActivityForm'));
const BookingForm = React.lazy(() => import('@/components/forms/BookingForm'));
const ClientForm = React.lazy(() => import('@/components/forms/ClientForm'));
const CoachForm = React.lazy(() => import('@/components/forms/CoachForm'));
const ConfirmDeleteModal = React.lazy(() => import('@/components/forms/ConfirmDeleteModal'));
const PlayerForm = React.lazy(() => import('@/components/forms/PlayerForm'));
const About = React.lazy(() => import('@/components/landing/About'));
const Contact = React.lazy(() => import('@/components/landing/Contact'));
const Features = React.lazy(() => import('@/components/landing/Features'));
const Footer = React.lazy(() => import('@/components/landing/Footer'));
const Hero = React.lazy(() => import('@/components/landing/Hero'));
const Navigation = React.lazy(() => import('@/components/landing/Navigation'));
const Stats = React.lazy(() => import('@/components/landing/Stats'));
const ContextCard = React.lazy(() => import('@/components/layout/ContextCard'));
const DashboardLayout = React.lazy(() => import('@/components/layout/DashboardLayout'));
const Layout = React.lazy(() => import('@/components/layout/Layout'));
const PageWrapper = React.lazy(() => import('@/components/layout/PageWrapper'));
const ResponsiveContainer = React.lazy(() => import('@/components/layout/ResponsiveContainer'));
const Sidebar = React.lazy(() => import('@/components/layout/Sidebar'));
const SidebarProvider = React.lazy(() => import('@/components/layout/SidebarProvider'));
const SidebarRail = React.lazy(() => import('@/components/layout/SidebarRail'));
const Topbar = React.lazy(() => import('@/components/layout/Topbar'));
const ModernSidebar = React.lazy(() => import('@/components/layout/modernSidebar/ModernSidebar'));
const SidebarHeader = React.lazy(() => import('@/components/layout/modernSidebar/SidebarHeader'));
const SidebarNavGroup = React.lazy(() => import('@/components/layout/modernSidebar/SidebarNavGroup'));
const SidebarNavItem = React.lazy(() => import('@/components/layout/modernSidebar/SidebarNavItem'));
const AppointmentModal = React.lazy(() => import('@/components/modals/AppointmentModal'));
const StyleControlPanel = React.lazy(() => import('@/components/panels/StyleControlPanel'));
const AppLogo = React.lazy(() => import('@/components/ui/AppLogo'));
const Activities = React.lazy(() => import('@/pages/Activities'));
const Bookings = React.lazy(() => import('@/pages/Bookings'));
const Clients = React.lazy(() => import('@/pages/Clients'));
const Coaches = React.lazy(() => import('@/pages/Coaches'));
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const Fields = React.lazy(() => import('@/pages/Fields'));
const Landing = React.lazy(() => import('@/pages/Landing'));
const Login = React.lazy(() => import('@/pages/Login'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));
const Players = React.lazy(() => import('@/pages/Players'));
const PremiumDashboard = React.lazy(() => import('@/pages/PremiumDashboard'));
const ResetPassword = React.lazy(() => import('@/pages/ResetPassword'));
const Roles = React.lazy(() => import('@/pages/Roles'));
const Settings = React.lazy(() => import('@/pages/Settings'));
const Swimming = React.lazy(() => import('@/pages/Swimming'));
const Users = React.lazy(() => import('@/pages/Users'));
const SportsOverview = React.lazy(() => import('@/pages/SportsOverview'));
const BookingsPage = React.lazy(() => import('@/pages/admin/BookingsPage'));
const FacilitiesPage = React.lazy(() => import('@/pages/admin/FacilitiesPage'));
const BookingList = React.lazy(() => import('@/pages/bookings/BookingList'));
const ClientList = React.lazy(() => import('@/pages/clients/ClientList'));
const Collections = React.lazy(() => import('@/pages/finance/Collections'));
const Pricing = React.lazy(() => import('@/pages/finance/Pricing'));
const Academy = React.lazy(() => import('@/pages/football/Academy'));
const Schools = React.lazy(() => import('@/pages/football/Schools'));
const FreeTime = React.lazy(() => import('@/pages/swimming/FreeTime'));
const FreeTimeBookings = React.lazy(() => import('@/pages/swimming/FreeTimeBookings'));
const Private = React.lazy(() => import('@/pages/swimming/Private'));
const PrivateBookings = React.lazy(() => import('@/pages/swimming/PrivateBookings'));
const SchoolsBookings = React.lazy(() => import('@/pages/swimming/SchoolsBookings'));
const SwimmingTabs = React.lazy(() => import('@/pages/swimming/SwimmingTabs'));
const UserList = React.lazy(() => import('@/pages/users/UserList'));
const SwimmingDashboard = React.lazy(() => import('@/modules/swimming/components/SwimmingDashboard'));
const FootballDashboard = React.lazy(() => import('@/modules/football/components/FootballDashboard'));
const FieldsDashboard = React.lazy(() => import('@/modules/fields/components/FieldsDashboard'));
const AccountingDashboard = React.lazy(() => import('@/modules/accounting/components/AccountingDashboard'));
const SportSelector = React.lazy(() => import('@/modules/shared/components/SportSelector'));
const ReportsOverview = React.lazy(() => import('@/modules/shared/components/ReportsOverview'));

function LazyApp() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse text-lg">Loading...</div>
    </div>}>
      <App />
    </Suspense>
  );
}

export default LazyApp;
