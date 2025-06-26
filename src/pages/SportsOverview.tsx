
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SportSelector } from '@/modules/shared/components/SportSelector';
import { ReportsOverview } from '@/modules/shared/components/ReportsOverview';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Settings, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const SportsOverview: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedSport, setSelectedSport] = useState<string>('');
  const isRTL = i18n.language === 'ar';

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {isRTL ? 'إدارة الرياضات' : 'Sports Management'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {isRTL 
              ? 'إدارة شاملة لجميع الأنشطة الرياضية والمرافق' 
              : 'Comprehensive management of all sports activities and facilities'
            }
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            {isRTL ? 'إعدادات' : 'Settings'}
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {isRTL ? 'رياضة جديدة' : 'Add Sport'}
          </Button>
        </div>
      </div>

      {/* Sports Selection */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl">
            {isRTL ? 'اختر الرياضة' : 'Select Sport'}
          </CardTitle>
          <CardDescription>
            {isRTL 
              ? 'اختر رياضة لعرض التفاصيل والإحصائيات الخاصة بها' 
              : 'Choose a sport to view its details and statistics'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SportSelector
            selectedSport={selectedSport}
            onSportSelect={setSelectedSport}
          />
        </CardContent>
      </Card>

      {/* Sport-Specific Actions */}
      {selectedSport && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-20 flex-col gap-2">
            <div className="font-medium">
              {isRTL ? 'إدارة اللاعبين' : 'Manage Players'}
            </div>
            <Badge variant="secondary">15 {isRTL ? 'لاعب' : 'players'}</Badge>
          </Button>
          
          <Button variant="outline" className="h-20 flex-col gap-2">
            <div className="font-medium">
              {isRTL ? 'إدارة المدربين' : 'Manage Coaches'}
            </div>
            <Badge variant="secondary">8 {isRTL ? 'مدربين' : 'coaches'}</Badge>
          </Button>
          
          <Button variant="outline" className="h-20 flex-col gap-2">
            <div className="font-medium">
              {isRTL ? 'إدارة المرافق' : 'Manage Facilities'}
            </div>
            <Badge variant="secondary">3 {isRTL ? 'مرافق' : 'facilities'}</Badge>
          </Button>
        </div>
      )}

      {/* Reports Overview */}
      <ReportsOverview selectedSport={selectedSport} />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isRTL ? 'إجمالي الحجوزات' : 'Total Bookings'}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  1,247
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isRTL ? 'الإيرادات الشهرية' : 'Monthly Revenue'}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  SAR 45,230
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isRTL ? 'اللاعبين النشطين' : 'Active Players'}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  342
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isRTL ? 'معدل الإشغال' : 'Occupancy Rate'}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  78.5%
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SportsOverview;
