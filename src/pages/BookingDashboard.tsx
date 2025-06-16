import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar, Users, DollarSign, TrendingUp, Search, Filter, Plus, Target, Waves, BarChart3, Activity, Eye, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSidebar } from '@/components/ui/sidebar';

export function BookingDashboard() {
  const { isRTL, t } = useLanguage();
  const { state } = useSidebar();
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate dynamic margin class
  const getContentMarginClass = () => {
    const isExpanded = state === 'expanded';
    if (isRTL) {
      return isExpanded ? 'content-margin-rtl-expanded' : 'content-margin-rtl-collapsed';
    } else {
      return isExpanded ? 'content-margin-ltr-expanded' : 'content-margin-ltr-collapsed';
    }
  };

  const stats = [
    {
      title: t('dashboard.totalBookings', 'إجمالي الحجوزات'),
      value: '1,234',
      change: '+12%',
      icon: Calendar,
      color: 'text-primary',
      trend: 'up'
    },
    {
      title: t('dashboard.activeClients', 'العملاء النشطون'),
      value: '856',
      change: '+8%',
      icon: Users,
      color: 'text-green-600',
      trend: 'up'
    },
    {
      title: t('dashboard.monthlyRevenue', 'الإيرادات الشهرية'),
      value: '45,678 ر.س',
      change: '+15%',
      icon: DollarSign,
      color: 'text-accent',
      trend: 'up'
    },
    {
      title: t('dashboard.occupancyRate', 'معدل الإشغال'),
      value: '78%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-purple-600',
      trend: 'up'
    }
  ];

  const recentBookings = [
    { 
      id: 1, 
      client: 'أحمد محمد علي', 
      facility: 'ملعب تنس رقم 1', 
      date: '2024-01-15',
      time: '14:00 - 15:00', 
      status: 'confirmed',
      amount: '150 ر.س'
    },
    { 
      id: 2, 
      client: 'سارة أحمد الزهراني', 
      facility: 'مسبح الأطفال', 
      date: '2024-01-15',
      time: '16:30 - 17:30', 
      status: 'pending',
      amount: '80 ر.س'
    },
    { 
      id: 3, 
      client: 'محمد علي السعدي', 
      facility: 'ملعب كرة سلة', 
      date: '2024-01-16',
      time: '18:00 - 19:00', 
      status: 'confirmed',
      amount: '120 ر.س'
    },
    { 
      id: 4, 
      client: 'فاطمة عبدالله', 
      facility: 'ملعب كرة قدم', 
      date: '2024-01-16',
      time: '19:00 - 20:00', 
      status: 'cancelled',
      amount: '200 ر.س'
    },
    { 
      id: 5, 
      client: 'خالد عبدالعزيز', 
      facility: 'المسبح الرئيسي', 
      date: '2024-01-17',
      time: '07:00 - 08:00', 
      status: 'confirmed',
      amount: '100 ر.س'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'status-badge-active';
      case 'pending': return 'status-badge-pending';
      case 'cancelled': return 'status-badge-inactive';
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
    <div className={`min-h-screen ${getContentMarginClass()} animate-fade-in`}>
      <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 ${isRTL ? 'lg:flex-row-reverse' : ''} animate-slide-up`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h1 className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
              {t('dashboard.title', 'لوحة تحكم المرافق الرياضية')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('dashboard.subtitle', 'إدارة شاملة ومتطورة لجميع المرافق والحجوزات')}
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''} animate-slide-in-right`}>
            <Button className="gradient-primary text-white hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              {t('dashboard.newBooking', 'حجز جديد')}
            </Button>
            <Button variant="outline" className="hover:bg-primary/10 hover:border-primary transition-all duration-300 hover:scale-105">
              <Filter className="w-4 h-4 mr-2" />
              {t('dashboard.filter', 'تصفية النتائج')}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={stat.title} 
              className="glass-card hover-glow hover-lift transition-all duration-500 animate-scale-in border-0 shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-3.5 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 ${stat.color} shadow-lg`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className={`${stat.trend === 'up' ? 'text-green-700 bg-green-100 dark:bg-green-900/20' : ''} animate-pulse font-medium`}>
                    {stat.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-2xl lg:text-3xl font-bold text-gradient mb-1">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          <TabsList className="grid w-full grid-cols-4 glass-effect p-1.5 animate-slide-up h-auto">
            <TabsTrigger value="overview" className="transition-all duration-300 hover:scale-105 data-[state=active]:gradient-primary data-[state=active]:text-white py-3 text-sm font-medium">
              {t('dashboard.overview', 'نظرة عامة')}
            </TabsTrigger>
            <TabsTrigger value="bookings" className="transition-all duration-300 hover:scale-105 data-[state=active]:gradient-primary data-[state=active]:text-white py-3 text-sm font-medium">
              {t('dashboard.bookings', 'الحجوزات')}
            </TabsTrigger>
            <TabsTrigger value="facilities" className="transition-all duration-300 hover:scale-105 data-[state=active]:gradient-primary data-[state=active]:text-white py-3 text-sm font-medium">
              {t('dashboard.facilities', 'المرافق')}
            </TabsTrigger>
            <TabsTrigger value="reports" className="transition-all duration-300 hover:scale-105 data-[state=active]:gradient-primary data-[state=active]:text-white py-3 text-sm font-medium">
              {t('dashboard.reports', 'التقارير')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 animate-fade-in">
            {/* Recent Bookings Table */}
            <Card className="glass-card hover-glow border-0 shadow-lg">
              <CardHeader>
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <CardTitle className="text-gradient text-xl mb-2">{t('dashboard.recentBookings', 'الحجوزات الأخيرة')}</CardTitle>
                    <CardDescription className="text-base">
                      {t('dashboard.recentBookingsDesc', 'آخر الحجوزات المسجلة في النظام')}
                    </CardDescription>
                  </div>
                  <div className="p-3 rounded-xl gradient-primary text-white shadow-lg">
                    <Calendar className="w-6 h-6" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="table-professional rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="table-header">
                        <TableHead className={`font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>العميل</TableHead>
                        <TableHead className={`font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>المرفق</TableHead>
                        <TableHead className={`font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>التاريخ</TableHead>
                        <TableHead className={`font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>الوقت</TableHead>
                        <TableHead className={`font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>المبلغ</TableHead>
                        <TableHead className={`font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>الحالة</TableHead>
                        <TableHead className={`font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentBookings.map((booking, index) => (
                        <TableRow 
                          key={booking.id} 
                          className="table-row animate-slide-in-left"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <TableCell className="font-medium">
                            <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                                {booking.client.charAt(0)}
                              </div>
                              <span>{booking.client}</span>
                            </div>
                          </TableCell>
                          <TableCell>{booking.facility}</TableCell>
                          <TableCell className="text-muted-foreground">{booking.date}</TableCell>
                          <TableCell className="font-medium">{booking.time}</TableCell>
                          <TableCell className="font-semibold text-accent">{booking.amount}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(booking.status)}>
                              {getStatusText(booking.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
