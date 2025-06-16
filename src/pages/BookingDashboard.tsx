import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp, 
  Plus,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function BookingDashboard() {
  const { isRTL, t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const mockBookings = [
    {
      id: 1,
      clientName: t('dashboard.sampleClient1', 'أحمد محمد'),
      activity: t('dashboard.tennisActivity', 'ملعب تنس'),
      time: '10:00 AM',
      date: '2024-01-15',
      status: 'confirmed',
      duration: '1 ساعة',
      price: '150 ريال'
    },
    {
      id: 2,
      clientName: t('dashboard.sampleClient2', 'ليلى خالد'),
      activity: t('dashboard.swimmingActivity', 'مسبح'),
      time: '03:30 PM',
      date: '2024-01-15',
      status: 'pending',
      duration: '30 دقيقة',
      price: '75 ريال'
    },
    {
      id: 3,
      clientName: t('dashboard.sampleClient3', 'عبدالله سالم'),
      activity: t('dashboard.footballActivity', 'ملعب كرة قدم'),
      time: '06:00 PM',
      date: '2024-01-16',
      status: 'cancelled',
      duration: '2 ساعة',
      price: '200 ريال'
    },
    {
      id: 4,
      clientName: t('dashboard.sampleClient4', 'نورة علي'),
      activity: t('dashboard.basketballActivity', 'ملعب كرة سلة'),
      time: '08:00 AM',
      date: '2024-01-16',
      status: 'confirmed',
      duration: '1.5 ساعة',
      price: '180 ريال'
    },
    {
      id: 5,
      clientName: t('dashboard.sampleClient5', 'يوسف محمد'),
      activity: t('dashboard.volleyballActivity', 'ملعب كرة طائرة'),
      time: '04:00 PM',
      date: '2024-01-17',
      status: 'confirmed',
      duration: '1 ساعة',
      price: '120 ريال'
    }
  ];

  const stats = [
    { 
      title: t('dashboard.todayBookings', 'حجوزات اليوم'), 
      value: mockBookings.filter(b => b.status === 'confirmed').length, 
      icon: Calendar, 
      trend: '+12%' 
    },
    { 
      title: t('dashboard.totalClients', 'إجمالي العملاء'), 
      value: 248, 
      icon: Users, 
      trend: '+8%' 
    },
    { 
      title: t('dashboard.revenue', 'الإيرادات'), 
      value: '12,450 ريال', 
      icon: TrendingUp, 
      trend: '+15%' 
    },
    { 
      title: t('dashboard.pendingBookings', 'الحجوزات المعلقة'), 
      value: mockBookings.filter(b => b.status === 'pending').length, 
      icon: Clock, 
      trend: '-5%' 
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', icon: CheckCircle },
      pending: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', icon: AlertCircle },
      cancelled: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', icon: XCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const StatusIcon = config.icon;
    
    return (
      <Badge className={`${config.color} ${isRTL ? 'flex-row-reverse' : ''} flex items-center gap-1`}>
        <StatusIcon className="h-3 w-3" />
        {t(`status.${status}`, status)}
      </Badge>
    );
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Dashboard Title */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          {t('dashboard.title', 'لوحة التحكم')}
        </h1>
        <p className="text-muted-foreground">
          {t('dashboard.subtitle', 'نظرة عامة على النشاط والحجوزات')}
        </p>
      </div>

      {/* Period Selection */}
      <div className={`flex items-center justify-between flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
          {['today', 'week', 'month'].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className="transition-all duration-200"
            >
              {t(`dashboard.${period}`, period)}
            </Button>
          ))}
        </div>
        
        <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            {t('dashboard.filter', 'تصفية')}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {t('dashboard.export', 'تصدير')}
          </Button>
          <Button size="sm" className="gradient-primary text-white">
            <Plus className="h-4 w-4 mr-2" />
            {t('dashboard.newBooking', 'حجز جديد')}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-accent/20">
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-green-600 font-medium mt-1">{stat.trend}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Bookings */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-accent/10">
        <CardHeader className="pb-4">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <CardTitle className="text-xl font-bold text-foreground">
                {t('dashboard.recentBookings', 'الحجوزات الأخيرة')}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {t('dashboard.recentBookingsDesc', 'آخر الحجوزات والأنشطة')}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              {t('dashboard.viewAll', 'عرض الكل')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockBookings.slice(0, 5).map((booking) => (
              <div 
                key={booking.id} 
                className={`flex items-center justify-between p-4 rounded-xl bg-background/50 hover:bg-accent/20 transition-all duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse text-right' : 'text-left'}`}>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{booking.clientName}</p>
                    <p className="text-sm text-muted-foreground">{booking.activity}</p>
                    <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} mt-1`}>
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{booking.time}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{booking.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                  {getStatusBadge(booking.status)}
                  <span className="font-bold text-primary">{booking.price}</span>
                  <div className={`flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
