
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
      trend: '+12%',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      title: t('dashboard.totalClients', 'إجمالي العملاء'), 
      value: 248, 
      icon: Users, 
      trend: '+8%',
      color: 'from-green-500 to-green-600'
    },
    { 
      title: t('dashboard.revenue', 'الإيرادات'), 
      value: '12,450 ريال', 
      icon: TrendingUp, 
      trend: '+15%',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      title: t('dashboard.pendingBookings', 'الحجوزات المعلقة'), 
      value: mockBookings.filter(b => b.status === 'pending').length, 
      icon: Clock, 
      trend: '-5%',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { 
        color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800', 
        icon: CheckCircle 
      },
      pending: { 
        color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800', 
        icon: AlertCircle 
      },
      cancelled: { 
        color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800', 
        icon: XCircle 
      }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const StatusIcon = config.icon;
    
    return (
      <Badge className={`${config.color} ${isRTL ? 'flex-row-reverse' : ''} flex items-center gap-1 border px-3 py-1`}>
        <StatusIcon className="h-3 w-3" />
        {t(`status.${status}`, status)}
      </Badge>
    );
  };

  return (
    <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'} max-w-full`}>
      {/* Dashboard Header */}
      <div className="flex flex-col space-y-4 animate-fade-in">
        <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient mb-2">
              {t('dashboard.title', 'لوحة التحكم')}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              {t('dashboard.subtitle', 'نظرة عامة على النشاط والحجوزات')}
            </p>
          </div>
          
          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} flex-wrap gap-2`}>
            {['today', 'week', 'month'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className="transition-all duration-200 hover-lift"
              >
                {t(`dashboard.${period}`, period)}
              </Button>
            ))}
          </div>
        </div>
        
        <div className={`flex items-center justify-between flex-wrap gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} flex-wrap gap-2`}>
            <Button variant="outline" size="sm" className="hover-lift">
              <Filter className="h-4 w-4 mr-2" />
              {t('dashboard.filter', 'تصفية')}
            </Button>
            <Button variant="outline" size="sm" className="hover-lift">
              <Download className="h-4 w-4 mr-2" />
              {t('dashboard.export', 'تصدير')}
            </Button>
          </div>
          
          <Button size="sm" className="gradient-primary text-white hover-glow">
            <Plus className="h-4 w-4 mr-2" />
            {t('dashboard.newBooking', 'حجز جديد')}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className="glass-card border-0 hover-lift animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4 md:p-6">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <p className="text-xs md:text-sm font-medium text-muted-foreground mb-2">{stat.title}</p>
                  <p className="text-xl md:text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className={`text-xs font-medium ${
                    stat.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {stat.trend}
                  </p>
                </div>
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg animate-glow`}>
                  <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Bookings */}
      <Card className="glass-card border-0 animate-slide-up">
        <CardHeader className="pb-4">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <CardTitle className="text-lg md:text-xl font-bold text-foreground">
                {t('dashboard.recentBookings', 'الحجوزات الأخيرة')}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                {t('dashboard.recentBookingsDesc', 'آخر الحجوزات والأنشطة')}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="hover-glow">
              {t('dashboard.viewAll', 'عرض الكل')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockBookings.slice(0, 5).map((booking, index) => (
              <div 
                key={booking.id} 
                className={`
                  flex items-center justify-between p-4 rounded-xl glass-effect hover:bg-accent/40 
                  transition-all duration-200 hover-lift animate-slide-in-left
                  ${isRTL ? 'flex-row-reverse' : ''}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse text-right' : 'text-left'} flex-1 min-w-0`}>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center animate-float">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground truncate">{booking.clientName}</p>
                    <p className="text-sm text-muted-foreground truncate">{booking.activity}</p>
                    <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} mt-1`}>
                      <Clock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{booking.time}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground truncate">{booking.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''} flex-shrink-0`}>
                  {getStatusBadge(booking.status)}
                  <span className="font-bold text-primary hidden sm:inline">{booking.price}</span>
                  <div className={`flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive">
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
