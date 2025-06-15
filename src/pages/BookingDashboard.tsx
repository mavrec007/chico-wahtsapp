
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
  MapPin,
  User,
  Phone,
  Mail,
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
      title: t('dashboard.totalBookings', 'Total Bookings'),
      value: '2,345',
      change: '+12%',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: t('dashboard.activeClients', 'Active Clients'),
      value: '1,234',
      change: '+8%',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: t('dashboard.monthlyRevenue', 'Monthly Revenue'),
      value: '$45,234',
      change: '+15%',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: t('dashboard.occupancyRate', 'Occupancy Rate'),
      value: '78%',
      change: '+3%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const recentBookings = [
    {
      id: 1,
      client: t('dashboard.sampleClient1', 'أحمد محمد'),
      facility: t('dashboard.sampleFacility1', 'Tennis Court 1'),
      time: '10:00 AM',
      date: '2024-01-15',
      status: 'confirmed'
    },
    {
      id: 2,
      client: t('dashboard.sampleClient2', 'سارة أحمد'),
      facility: t('dashboard.sampleFacility2', 'Swimming Pool'),
      time: '2:00 PM',
      date: '2024-01-15',
      status: 'pending'
    },
    {
      id: 3,
      client: t('dashboard.sampleClient3', 'محمد علي'),
      facility: t('dashboard.sampleFacility3', 'Basketball Court'),
      time: '4:00 PM',
      date: '2024-01-15',
      status: 'confirmed'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { 
        label: t('dashboard.confirmed', 'مؤكد'), 
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
      },
      pending: { 
        label: t('dashboard.pending', 'في الانتظار'), 
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
      },
      cancelled: { 
        label: t('dashboard.cancelled', 'ملغي'), 
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
      <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {t('dashboard.title', 'لوحة تحكم الحجوزات')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {t('dashboard.subtitle', 'إدارة شاملة لحجوزات المرافق الرياضية')}
            </p>
          </div>
          <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
            <Button variant="outline" size="sm">
              <Filter className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('dashboard.filter', 'تصفية')}
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800">
              <Plus className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('dashboard.newBooking', 'حجز جديد')}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {stat.value}
                    </p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} {t('dashboard.fromLastMonth', 'من الشهر الماضي')}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t('dashboard.overview', 'نظرة عامة')}</TabsTrigger>
            <TabsTrigger value="bookings">{t('dashboard.bookings', 'الحجوزات')}</TabsTrigger>
            <TabsTrigger value="facilities">{t('dashboard.facilities', 'المرافق')}</TabsTrigger>
            <TabsTrigger value="reports">{t('dashboard.reports', 'التقارير')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <Clock className="h-5 w-5" />
                  <span>{t('dashboard.recentBookings', 'الحجوزات الأخيرة')}</span>
                </CardTitle>
                <CardDescription>
                  {t('dashboard.recentBookingsDesc', 'آخر الحجوزات المسجلة في النظام')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className={`flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{booking.client}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{booking.facility}</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{booking.time}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{booking.date}</p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.allBookings', 'جميع الحجوزات')}</CardTitle>
                <CardDescription>
                  {t('dashboard.allBookingsDesc', 'إدارة وعرض جميع الحجوزات')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`flex items-center space-x-4 mb-6 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <div className="relative flex-1">
                    <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400`} />
                    <input
                      type="text"
                      placeholder={t('dashboard.searchBookings', 'البحث في الحجوزات...')}
                      className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'} py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t('dashboard.filter', 'تصفية')}
                  </Button>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                  {t('dashboard.bookingsContent', 'محتوى إدارة الحجوزات سيتم إضافته هنا')}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <Target className="h-5 w-5 text-orange-600" />
                    <span>{t('dashboard.sportsCourts', 'الملاعب الرياضية')}</span>
                  </CardTitle>
                  <CardDescription>
                    {t('dashboard.sportsCountsDesc', 'إدارة ملاعب التنس وكرة السلة والقدم')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.available', 'متاح')}</span>
                      <span className="text-sm font-medium text-green-600">8/10</span>
                    </div>
                    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.occupied', 'مشغول')}</span>
                      <span className="text-sm font-medium text-orange-600">2/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <Waves className="h-5 w-5 text-blue-600" />
                    <span>{t('dashboard.swimmingPools', 'المسابح')}</span>
                  </CardTitle>
                  <CardDescription>
                    {t('dashboard.swimmingPoolsDesc', 'إدارة المسابح ومرافق السباحة')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.available', 'متاح')}</span>
                      <span className="text-sm font-medium text-green-600">3/4</span>
                    </div>
                    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.occupied', 'مشغول')}</span>
                      <span className="text-sm font-medium text-orange-600">1/4</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.analyticsReports', 'التقارير والتحليلات')}</CardTitle>
                <CardDescription>
                  {t('dashboard.analyticsReportsDesc', 'تقارير مفصلة عن الأداء والإحصائيات')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                  {t('dashboard.reportsContent', 'محتوى التقارير والتحليلات سيتم إضافته هنا')}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
