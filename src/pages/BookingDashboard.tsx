
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, DollarSign, TrendingUp, Search, Filter, Plus, Target, Waves, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSidebar } from '@/components/ui/sidebar';

export function BookingDashboard() {
  const { isRTL, t } = useLanguage();
  const { state } = useSidebar();
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate dynamic margin for main content
  const getMainMargin = () => {
    if (isRTL) {
      return state === 'expanded' ? 'mr-0 lg:mr-72' : 'mr-0 lg:mr-16';
    } else {
      return state === 'expanded' ? 'ml-0 lg:ml-72' : 'ml-0 lg:ml-16';
    }
  };

  const stats = [
    {
      title: t('dashboard.totalBookings', 'إجمالي الحجوزات'),
      value: '1,234',
      change: '+12%',
      icon: Calendar,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: t('dashboard.activeClients', 'العملاء النشطون'),
      value: '856',
      change: '+8%',
      icon: Users,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      title: t('dashboard.monthlyRevenue', 'الإيرادات الشهرية'),
      value: '45,678 ر.س',
      change: '+15%',
      icon: DollarSign,
      color: 'text-primary'
    },
    {
      title: t('dashboard.occupancyRate', 'معدل الإشغال'),
      value: '78%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-purple-600 dark:text-purple-400'
    }
  ];

  const recentBookings = [
    { id: 1, client: t('dashboard.sampleClient1', 'أحمد محمد'), facility: t('dashboard.sampleFacility1', 'ملعب تنس 1'), time: '14:00', status: 'confirmed' },
    { id: 2, client: t('dashboard.sampleClient2', 'سارة أحمد'), facility: t('dashboard.sampleFacility2', 'مسبح'), time: '16:30', status: 'pending' },
    { id: 3, client: t('dashboard.sampleClient3', 'محمد علي'), facility: t('dashboard.sampleFacility3', 'ملعب كرة سلة'), time: '18:00', status: 'confirmed' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return t('dashboard.confirmed', 'مؤكد');
      case 'pending': return t('dashboard.pending', 'في الانتظار');
      case 'cancelled': return t('dashboard.cancelled', 'ملغي');
      default: return status;
    }
  };

  return (
    <div className={`
      min-h-screen transition-all duration-500 ease-in-out 
      ${getMainMargin()}
      animate-fade-in
    `}>
      <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
        {/* Header Section with enhanced animations */}
        <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ${isRTL ? 'lg:flex-row-reverse' : ''} animate-slide-up`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h1 className="text-3xl lg:text-4xl font-bold text-gradient animate-glow">
              {t('dashboard.title', 'لوحة تحكم الحجوزات')}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg animate-fade-in" style={{ animationDelay: '200ms' }}>
              {t('dashboard.subtitle', 'إدارة شاملة لحجوزات المرافق الرياضية')}
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''} animate-slide-in-right`}>
            <Button className="gradient-primary text-white hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              {t('dashboard.newBooking', 'حجز جديد')}
            </Button>
            <Button variant="outline" className="hover:bg-primary/10 hover:border-primary transition-all duration-300 hover:scale-105">
              <Filter className="w-4 h-4 mr-2" />
              {t('dashboard.filter', 'تصفية')}
            </Button>
          </div>
        </div>

        {/* Stats Cards with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={stat.title} 
              className="glass-card hover-glow hover-lift transition-all duration-500 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="animate-pulse">
                    {stat.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-2xl lg:text-3xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-muted-foreground text-sm mt-1">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs with enhanced styling */}
        <Tabs defaultValue="overview" className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          <TabsList className="grid w-full grid-cols-4 glass-effect p-1 animate-slide-up">
            <TabsTrigger value="overview" className="transition-all duration-300 hover:scale-105 data-[state=active]:gradient-primary data-[state=active]:text-white">
              {t('dashboard.overview', 'نظرة عامة')}
            </TabsTrigger>
            <TabsTrigger value="bookings" className="transition-all duration-300 hover:scale-105 data-[state=active]:gradient-primary data-[state=active]:text-white">
              {t('dashboard.bookings', 'الحجوزات')}
            </TabsTrigger>
            <TabsTrigger value="facilities" className="transition-all duration-300 hover:scale-105 data-[state=active]:gradient-primary data-[state=active]:text-white">
              {t('dashboard.facilities', 'المرافق')}
            </TabsTrigger>
            <TabsTrigger value="reports" className="transition-all duration-300 hover:scale-105 data-[state=active]:gradient-primary data-[state=active]:text-white">
              {t('dashboard.reports', 'التقارير')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            {/* Recent Bookings */}
            <Card className="glass-card hover-glow">
              <CardHeader>
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <CardTitle className="text-gradient">{t('dashboard.recentBookings', 'الحجوزات الأخيرة')}</CardTitle>
                    <CardDescription className="mt-1">
                      {t('dashboard.recentBookingsDesc', 'آخر الحجوزات المسجلة في النظام')}
                    </CardDescription>
                  </div>
                  <Calendar className="w-8 h-8 text-primary animate-float" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking, index) => (
                    <div 
                      key={booking.id} 
                      className="flex items-center justify-between p-4 rounded-xl glass-effect hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] animate-slide-in-left"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white font-semibold animate-glow">
                          {booking.client.charAt(0)}
                        </div>
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                          <p className="font-medium">{booking.client}</p>
                          <p className="text-sm text-muted-foreground">{booking.facility}</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <span className="text-sm font-medium">{booking.time}</span>
                        <Badge className={getStatusColor(booking.status)}>
                          {getStatusText(booking.status)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6 animate-fade-in">
            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="text-gradient">{t('dashboard.allBookings', 'جميع الحجوزات')}</CardTitle>
                <CardDescription>{t('dashboard.allBookingsDesc', 'إدارة وعرض جميع الحجوزات')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground`} />
                    <Input
                      placeholder={t('dashboard.searchBookings', 'البحث في الحجوزات...')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`${isRTL ? 'pr-10' : 'pl-10'} glass-effect transition-all duration-300 focus:scale-105`}
                    />
                  </div>
                </div>
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50 animate-float" />
                  <p>{t('dashboard.bookingsContent', 'محتوى إدارة الحجوزات سيتم إضافته هنا')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card hover-glow hover-lift">
                <CardHeader>
                  <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <div className="p-3 rounded-xl gradient-primary text-white">
                      <Target className="w-6 h-6" />
                    </div>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <CardTitle className="text-gradient">{t('dashboard.sportsCourts', 'الملاعب الرياضية')}</CardTitle>
                      <CardDescription>{t('dashboard.sportsCountsDesc', 'إدارة ملاعب التنس وكرة السلة والقدم')}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{t('dashboard.available', 'متاح')}</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">12</Badge>
                    </div>
                    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{t('dashboard.occupied', 'مشغول')}</span>
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">5</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow hover-lift">
                <CardHeader>
                  <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <div className="p-3 rounded-xl gradient-primary text-white">
                      <Waves className="w-6 h-6" />
                    </div>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <CardTitle className="text-gradient">{t('dashboard.swimmingPools', 'المسابح')}</CardTitle>
                      <CardDescription>{t('dashboard.swimmingPoolsDesc', 'إدارة المسابح ومرافق السباحة')}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{t('dashboard.available', 'متاح')}</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">3</Badge>
                    </div>
                    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{t('dashboard.occupied', 'مشغول')}</span>
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">1</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6 animate-fade-in">
            <Card className="glass-card hover-glow">
              <CardHeader>
                <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                  <div className="p-3 rounded-xl gradient-primary text-white">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <CardTitle className="text-gradient">{t('dashboard.analyticsReports', 'التقارير والتحليلات')}</CardTitle>
                    <CardDescription>{t('dashboard.analyticsReportsDesc', 'تقارير مفصلة عن الأداء والإحصائيات')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50 animate-float" />
                  <p>{t('dashboard.reportsContent', 'محتوى التقارير والتحليلات سيتم إضافته هنا')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
