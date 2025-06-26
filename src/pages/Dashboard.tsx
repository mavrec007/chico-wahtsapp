
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Activity,
  Building2,
  UserCheck,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const stats = [
    {
      title: isRTL ? 'إجمالي الحجوزات' : 'Total Bookings',
      value: '1,247',
      change: '+12.3%',
      changeType: 'positive' as const,
      icon: Calendar,
      color: 'blue'
    },
    {
      title: isRTL ? 'الإيرادات الشهرية' : 'Monthly Revenue',
      value: 'SAR 45,230',
      change: '+8.7%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'green'
    },
    {
      title: isRTL ? 'اللاعبين النشطين' : 'Active Players',
      value: '342',
      change: '+15.2%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'purple'
    },
    {
      title: isRTL ? 'معدل الإشغال' : 'Occupancy Rate',
      value: '78.5%',
      change: '-2.1%',
      changeType: 'negative' as const,
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  const quickActions = [
    {
      title: isRTL ? 'حجز جديد' : 'New Booking',
      description: isRTL ? 'إنشاء حجز جديد للمرافق' : 'Create a new facility booking',
      icon: Calendar,
      color: 'blue',
      path: '/bookings'
    },
    {
      title: isRTL ? 'إدارة اللاعبين' : 'Manage Players',
      description: isRTL ? 'عرض وإدارة ملفات اللاعبين' : 'View and manage player profiles',
      icon: Users,
      color: 'green',
      path: '/players'
    },
    {
      title: isRTL ? 'إدارة المدربين' : 'Manage Coaches',
      description: isRTL ? 'عرض وإدارة ملفات المدربين' : 'View and manage coach profiles',
      icon: UserCheck,
      color: 'purple',
      path: '/coaches'
    },
    {
      title: isRTL ? 'التقارير' : 'Reports',
      description: isRTL ? 'عرض التقارير والإحصائيات' : 'View reports and analytics',
      icon: BarChart3,
      color: 'orange',
      path: '/reports'
    }
  ];

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600 dark:text-green-400';
      case 'negative':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t('dashboard', isRTL ? 'لوحة التحكم' : 'Dashboard')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {isRTL 
              ? 'نظرة شاملة على أداء المرافق الرياضية' 
              : 'Comprehensive overview of your sports facility performance'
            }
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            {isRTL ? 'نظرة عامة على الرياضات' : 'Sports Overview'}
          </Button>
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            {isRTL ? 'حجز جديد' : 'New Booking'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          
          return (
            <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1">
                      <span className={cn(
                        'text-sm font-medium',
                        getChangeColor(stat.changeType)
                      )}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {isRTL ? 'من الشهر الماضي' : 'from last month'}
                      </span>
                    </div>
                  </div>
                  
                  <div className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    `bg-${stat.color}-100 dark:bg-${stat.color}-900/20`
                  )}>
                    <IconComponent className={cn(
                      'w-6 h-6',
                      `text-${stat.color}-600 dark:text-${stat.color}-400`
                    )} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {isRTL ? 'الإجراءات السريعة' : 'Quick Actions'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            
            return (
              <Card 
                key={index} 
                className="cursor-pointer transition-all duration-200 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:border-primary/50"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      `bg-${action.color}-100 dark:bg-${action.color}-900/20`
                    )}>
                      <IconComponent className={cn(
                        'w-5 h-5',
                        `text-${action.color}-600 dark:text-${action.color}-400`
                      )} />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl">
            {isRTL ? 'النشاط الحديث' : 'Recent Activity'}
          </CardTitle>
          <CardDescription>
            {isRTL 
              ? 'آخر الأحداث والتحديثات في النظام' 
              : 'Latest events and updates in the system'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Activity items would go here */}
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {isRTL ? 'تم إنشاء حجز جديد' : 'New booking created'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {isRTL ? 'منذ 5 دقائق' : '5 minutes ago'}
                </p>
              </div>
              <Badge variant="secondary">
                {isRTL ? 'حجز' : 'Booking'}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {isRTL ? 'تم تسجيل لاعب جديد' : 'New player registered'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {isRTL ? 'منذ 15 دقيقة' : '15 minutes ago'}
                </p>
              </div>
              <Badge variant="secondary">
                {isRTL ? 'لاعب' : 'Player'}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {isRTL ? 'تم إضافة مدرب جديد' : 'New coach added'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {isRTL ? 'منذ ساعة' : '1 hour ago'}
                </p>
              </div>
              <Badge variant="secondary">
                {isRTL ? 'مدرب' : 'Coach'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
