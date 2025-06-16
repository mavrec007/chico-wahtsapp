
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  User,
  Plus,
  Filter,
  Search,
  Target,
  Waves
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BookingDashboard() {
  const { isRTL, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = [
    {
      title: t('dashboard.totalBookings'),
      value: '2,345',
      change: '+12%',
      icon: Calendar,
    },
    {
      title: t('dashboard.activeClients'),
      value: '1,234',
      change: '+8%',
      icon: Users,
    },
    {
      title: t('dashboard.monthlyRevenue'),
      value: '$45,234',
      change: '+15%',
      icon: DollarSign,
    },
    {
      title: t('dashboard.occupancyRate'),
      value: '78%',
      change: '+3%',
      icon: TrendingUp,
    }
  ];

  const recentBookings = [
    {
      id: 1,
      client: t('dashboard.sampleClient1'),
      facility: t('dashboard.sampleFacility1'),
      time: '10:00 AM',
      date: '2024-01-15',
      status: 'confirmed'
    },
    {
      id: 2,
      client: t('dashboard.sampleClient2'),
      facility: t('dashboard.sampleFacility2'),
      time: '2:00 PM',
      date: '2024-01-15',
      status: 'pending'
    },
    {
      id: 3,
      client: t('dashboard.sampleClient3'),
      facility: t('dashboard.sampleFacility3'),
      time: '4:00 PM',
      date: '2024-01-15',
      status: 'confirmed'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { 
        label: t('dashboard.confirmed'), 
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
      },
      pending: { 
        label: t('dashboard.pending'), 
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
      },
      cancelled: { 
        label: t('dashboard.cancelled'), 
        color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' 
      }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  return (
    <AppLayout>
      <div className={`space-y-8 p-6 animate-fade-in ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="animate-slide-up">
            <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''} mb-4`}>
              <Button className="gradient-primary text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('dashboard.newBooking')}
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-accent transition-all duration-200">
                <Filter className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('dashboard.filter')}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 gradient-card animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-6">
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} {t('dashboard.fromLastMonth')}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              {t('dashboard.overview')}
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              {t('dashboard.bookings')}
            </TabsTrigger>
            <TabsTrigger value="facilities" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              {t('dashboard.facilities')}
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              {t('dashboard.reports')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            {/* Recent Bookings */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{t('dashboard.recentBookings')}</span>
                </CardTitle>
                <CardDescription>
                  {t('dashboard.recentBookingsDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking, index) => (
                    <div 
                      key={booking.id} 
                      className={`flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-all duration-200 animate-slide-up ${isRTL ? 'flex-row-reverse' : ''}`}
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                          <p className="font-medium text-foreground">{booking.client}</p>
                          <p className="text-sm text-muted-foreground">{booking.facility}</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                          <p className="text-sm font-medium text-foreground">{booking.time}</p>
                          <p className="text-sm text-muted-foreground">{booking.date}</p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6 animate-fade-in">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>{t('dashboard.allBookings')}</CardTitle>
                <CardDescription>
                  {t('dashboard.allBookingsDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`flex items-center space-x-4 mb-6 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <div className="relative flex-1">
                    <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground`} />
                    <input
                      type="text"
                      placeholder={t('dashboard.searchBookings')}
                      className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-2 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-ring transition-all duration-200`}
                    />
                  </div>
                  <Button variant="outline" className="hover:bg-accent">
                    <Filter className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t('dashboard.filter')}
                  </Button>
                </div>
                <p className="text-muted-foreground text-center py-8">
                  {t('dashboard.bookingsContent')}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300 gradient-card">
                <CardHeader>
                  <CardTitle className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <Target className="h-5 w-5 text-primary" />
                    <span>{t('dashboard.sportsCourts')}</span>
                  </CardTitle>
                  <CardDescription>
                    {t('dashboard.sportsCountsDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-muted-foreground">{t('dashboard.available')}</span>
                      <span className="text-sm font-medium text-green-600">8/10</span>
                    </div>
                    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-muted-foreground">{t('dashboard.occupied')}</span>
                      <span className="text-sm font-medium text-orange-600">2/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 gradient-card">
                <CardHeader>
                  <CardTitle className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <Waves className="h-5 w-5 text-primary" />
                    <span>{t('dashboard.swimmingPools')}</span>
                  </CardTitle>
                  <CardDescription>
                    {t('dashboard.swimmingPoolsDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-muted-foreground">{t('dashboard.available')}</span>
                      <span className="text-sm font-medium text-green-600">3/4</span>
                    </div>
                    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-muted-foreground">{t('dashboard.occupied')}</span>
                      <span className="text-sm font-medium text-orange-600">1/4</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6 animate-fade-in">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>{t('dashboard.analyticsReports')}</CardTitle>
                <CardDescription>
                  {t('dashboard.analyticsReportsDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  {t('dashboard.reportsContent')}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
