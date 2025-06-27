
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, TrendingUp, Users, CreditCard, Calendar, Receipt } from 'lucide-react';

const AccountingDashboard: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('accounting.totalRevenue'),
      value: '56,500 ر.س',
      change: '+18%',
      icon: DollarSign,
      color: 'green',
    },
    {
      title: t('accounting.pendingPayments'),
      value: '8,750 ر.س',
      change: '-5%',
      icon: CreditCard,
      color: 'yellow',
    },
    {
      title: t('accounting.collections'),
      value: '47,750 ر.س',
      change: '+22%',
      icon: Receipt,
      color: 'blue',
    },
    {
      title: t('accounting.monthlyGrowth'),
      value: '15.5%',
      change: '+3%',
      icon: TrendingUp,
      color: 'purple',
    },
  ];

  const recentTransactions = [
    {
      id: '1',
      client: 'أحمد محمد',
      department: 'السباحة الخاصة',
      amount: '150',
      type: 'deposit',
      status: 'completed',
      date: '2024-01-15',
    },
    {
      id: '2',
      client: 'فاطمة علي',
      department: 'أكاديمية كرة القدم',
      amount: '300',
      type: 'full',
      status: 'pending',
      date: '2024-01-15',
    },
    {
      id: '3',
      client: 'محمد خالد',
      department: 'مدارس السباحة',
      amount: '200',
      type: 'remaining',
      status: 'completed',
      date: '2024-01-14',
    },
  ];

  const departmentRevenue = [
    { name: 'السباحة الخاصة', revenue: '18,500', percentage: '33%' },
    { name: 'أكاديمية كرة القدم', revenue: '22,750', percentage: '40%' },
    { name: 'مدارس السباحة', revenue: '10,250', percentage: '18%' },
    { name: 'الفترة الحرة', revenue: '5,000', percentage: '9%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('accounting.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('accounting.subtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            {t('accounting.exportReport')}
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            {t('accounting.newCollection')}
          </Button>
        </div>
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

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">{t('accounting.overview')}</TabsTrigger>
          <TabsTrigger value="collections">{t('accounting.collections')}</TabsTrigger>
          <TabsTrigger value="reports">{t('accounting.reports')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Revenue */}
            <Card>
              <CardHeader>
                <CardTitle>{t('accounting.departmentRevenue')}</CardTitle>
                <CardDescription>
                  {t('accounting.revenueBreakdown')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentRevenue.map((dept) => (
                    <div key={dept.name} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{dept.name}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: dept.percentage }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-semibold">{dept.revenue} ر.س</p>
                        <p className="text-sm text-gray-500">{dept.percentage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>{t('accounting.recentTransactions')}</CardTitle>
                <CardDescription>
                  {t('accounting.latestPayments')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{transaction.client}</p>
                        <p className="text-sm text-gray-500">{transaction.department}</p>
                        <p className="text-xs text-gray-400">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{transaction.amount} ر.س</p>
                        <Badge className={
                          transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }>
                          {t(`accounting.status.${transaction.status}`)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="collections">
          <Card>
            <CardHeader>
              <CardTitle>{t('accounting.collectionsManagement')}</CardTitle>
              <CardDescription>
                {t('accounting.managePayments')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">{t('common.comingSoon')}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>{t('accounting.reports')}</CardTitle>
              <CardDescription>
                {t('accounting.detailedReports')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">{t('common.comingSoon')}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountingDashboard;
