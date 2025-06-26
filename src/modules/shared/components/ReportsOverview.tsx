
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  DollarSign,
  Download,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReportCard {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: React.ComponentType<any>;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  sportId?: string;
}

interface ReportsOverviewProps {
  selectedSport?: string;
  className?: string;
}

export const ReportsOverview: React.FC<ReportsOverviewProps> = ({
  selectedSport,
  className
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const reportCards: ReportCard[] = [
    {
      id: 'total-revenue',
      title: 'Total Revenue',
      titleAr: 'إجمالي الإيرادات',
      description: 'Monthly revenue across all sports',
      descriptionAr: 'الإيرادات الشهرية لجميع الرياضات',
      icon: DollarSign,
      value: 'SAR 45,230',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      id: 'active-bookings',
      title: 'Active Bookings',
      titleAr: 'الحجوزات النشطة',
      description: 'Current active bookings',
      descriptionAr: 'الحجوزات النشطة الحالية',
      icon: Calendar,
      value: '127',
      change: '+8.2%',
      changeType: 'positive'
    },
    {
      id: 'total-players',
      title: 'Total Players',
      titleAr: 'إجمالي اللاعبين',
      description: 'Registered players',
      descriptionAr: 'اللاعبون المسجلون',
      icon: Users,
      value: '342',
      change: '+15.3%',
      changeType: 'positive'
    },
    {
      id: 'facility-usage',
      title: 'Facility Usage',
      titleAr: 'استخدام المرافق',
      description: 'Average facility utilization',
      descriptionAr: 'متوسط استخدام المرافق',
      icon: BarChart3,
      value: '78.5%',
      change: '-2.1%',
      changeType: 'negative'
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
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {isRTL 
              ? 'نظرة شاملة على أداء المرافق الرياضية' 
              : 'Comprehensive overview of sports facility performance'
            }
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            {isRTL ? 'تصفية' : 'Filter'}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            {isRTL ? 'تصدير' : 'Export'}
          </Button>
        </div>
      </div>

      {/* Sport Filter */}
      {selectedSport && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {isRTL ? 'مصفى حسب:' : 'Filtered by:'} {selectedSport}
          </Badge>
        </div>
      )}

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportCards.map((card) => {
          const IconComponent = card.icon;
          
          return (
            <Card key={card.id} className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {isRTL ? card.titleAr : card.title}
                      </CardTitle>
                    </div>
                  </div>
                  <TrendingUp className={cn(
                    'w-4 h-4',
                    getChangeColor(card.changeType)
                  )} />
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {card.value}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'text-sm font-medium',
                      getChangeColor(card.changeType)
                    )}>
                      {card.change}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {isRTL ? 'من الشهر الماضي' : 'from last month'}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {isRTL ? card.descriptionAr : card.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="h-auto p-4 justify-start">
          <BarChart3 className="w-5 h-5 mr-3" />
          <div className="text-left">
            <div className="font-medium">
              {isRTL ? 'تقرير مفصل' : 'Detailed Report'}
            </div>
            <div className="text-sm text-gray-500">
              {isRTL ? 'عرض التقرير الكامل' : 'View comprehensive report'}
            </div>
          </div>
        </Button>
        
        <Button variant="outline" className="h-auto p-4 justify-start">
          <Calendar className="w-5 h-5 mr-3" />
          <div className="text-left">
            <div className="font-medium">
              {isRTL ? 'جدولة التقارير' : 'Schedule Reports'}
            </div>
            <div className="text-sm text-gray-500">
              {isRTL ? 'تقارير تلقائية' : 'Automated reports'}
            </div>
          </div>
        </Button>
        
        <Button variant="outline" className="h-auto p-4 justify-start">
          <Download className="w-5 h-5 mr-3" />
          <div className="text-left">
            <div className="font-medium">
              {isRTL ? 'تصدير البيانات' : 'Export Data'}
            </div>
            <div className="text-sm text-gray-500">
              {isRTL ? 'تنزيل كملف Excel' : 'Download as Excel'}
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};
