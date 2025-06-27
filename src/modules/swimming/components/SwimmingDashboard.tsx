
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, School, Clock, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { swimmingDepartments, departmentConfig } from '@/config/departments';

const SwimmingDashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const stats = [
    {
      title: t('swimming.totalBookings'),
      value: '156',
      change: '+12%',
      icon: Calendar,
      color: 'blue',
    },
    {
      title: t('swimming.activeTrainers'),
      value: '8',
      change: '+2',
      icon: Users,  
      color: 'green',
    },
    {
      title: t('swimming.monthlyRevenue'),
      value: '15,250 ر.س',
      change: '+18%',
      icon: DollarSign,
      color: 'purple',
    },
    {
      title: t('swimming.poolUtilization'),
      value: '78%',
      change: '+5%',
      icon: TrendingUp,
      color: 'orange',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('swimming.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('swimming.subtitle')}
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          {t('swimming.newBooking')}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                      <Icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <Badge variant="secondary" className="text-green-600">
                      {stat.change}
                    </Badge>
                    <span className="text-sm text-gray-500 ml-2">
                      {t('common.fromLastMonth')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Departments Tabs */}
      <Tabs defaultValue="private" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          {swimmingDepartments.map((dept) => {
            const Icon = departmentConfig.swimming[dept.category].icon;
            return (
              <TabsTrigger key={dept.id} value={dept.category} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {isRTL ? dept.nameAr : dept.name}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {swimmingDepartments.map((dept) => (
          <TabsContent key={dept.id} value={dept.category} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {React.createElement(departmentConfig.swimming[dept.category].icon, {
                    className: "h-5 w-5"
                  })}
                  {isRTL ? dept.nameAr : dept.name}
                </CardTitle>
                <CardDescription>
                  {t(`swimming.${dept.category}.description`)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{t('common.todayBookings')}</h4>
                      <p className="text-2xl font-bold text-blue-600">12</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{t('common.activeTrainers')}</h4>
                      <p className="text-2xl font-bold text-green-600">
                        {departmentConfig.swimming[dept.category].requiresTrainer ? '3' : '-'}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{t('common.revenue')}</h4>
                      <p className="text-2xl font-bold text-purple-600">2,450 ر.س</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SwimmingDashboard;
