
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Wrench, Calendar, DollarSign } from 'lucide-react';

const FieldsDashboard: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('fields.totalFields'),
      value: '8',
      change: '+1',
      icon: MapPin,
      color: 'blue',
    },
    {
      title: t('fields.activeBookings'),
      value: '24',
      change: '+8%',
      icon: Calendar,
      color: 'green',
    },
    {
      title: t('fields.utilization'),
      value: '85%',
      change: '+12%',
      icon: Clock,
      color: 'purple',
    },
    {
      title: t('fields.revenue'),
      value: '12,500 ر.س',
      change: '+15%',
      icon: DollarSign,
      color: 'orange',
    },
  ];

  const fields = [
    {
      id: '1',
      name: 'Football Field A',
      nameAr: 'ملعب كرة القدم أ',
      type: 'football',
      capacity: 22,
      status: 'active',
      bookings: 8,
      revenue: '3,200',
    },
    {
      id: '2',
      name: 'Football Field B', 
      nameAr: 'ملعب كرة القدم ب',
      type: 'football',
      capacity: 22,
      status: 'maintenance',
      bookings: 0,
      revenue: '0',
    },
    {
      id: '3',
      name: 'Swimming Pool Main',
      nameAr: 'المسبح الرئيسي',
      type: 'swimming-pool',
      capacity: 50,
      status: 'active',
      bookings: 12,
      revenue: '4,800',
    },
    {
      id: '4',
      name: 'Basketball Court',
      nameAr: 'ملعب كرة السلة',
      type: 'basketball',
      capacity: 20,
      status: 'active',
      bookings: 4,
      revenue: '1,600',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'football': return '⚽';
      case 'basketball': return '🏀';
      case 'swimming-pool': return '🏊';
      case 'tennis': return '🎾';
      default: return '🏟️';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('fields.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('fields.subtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Wrench className="h-4 w-4 mr-2" />
            {t('fields.maintenance')}
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            {t('fields.newBooking')}
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

      {/* Fields Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('fields.allFields')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {fields.map((field) => (
            <Card key={field.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{getTypeIcon(field.type)}</span>
                  <div>
                    <p className="font-semibold">{field.nameAr}</p>
                    <p className="text-sm text-gray-500">{field.name}</p>
                  </div>
                </CardTitle>
                <Badge className={getStatusColor(field.status)}>
                  {t(`fields.status.${field.status}`)}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('fields.capacity')}</span>
                    <Badge variant="outline">{field.capacity}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('fields.todayBookings')}</span>
                    <Badge variant="outline">{field.bookings}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('fields.revenue')}</span>
                    <Badge variant="outline">{field.revenue} ر.س</Badge>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    {t('common.viewDetails')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FieldsDashboard;
