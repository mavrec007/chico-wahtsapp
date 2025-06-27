
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Users, MapPin, Trophy, Calendar, DollarSign } from 'lucide-react';

const FootballDashboard: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('football.totalPlayers'),
      value: '245',
      change: '+15%',
      icon: Users,
      color: 'blue',
    },
    {
      title: t('football.activeAcademies'),
      value: '3',
      change: '+1',
      icon: GraduationCap,
      color: 'green',
    },
    {
      title: t('football.availableFields'),
      value: '5',
      change: '0',
      icon: MapPin,
      color: 'orange',
    },
    {
      title: t('football.monthlyRevenue'),
      value: '28,750 ر.س',
      change: '+22%',
      icon: DollarSign,
      color: 'purple',
    },
  ];

  const academies = [
    {
      id: '1',
      name: 'Youth Academy',
      nameAr: 'أكاديمية الشباب',
      players: 85,
      trainers: 4,
      established: '2020',
    },
    {
      id: '2', 
      name: 'Elite Academy',
      nameAr: 'الأكاديمية المتميزة',
      players: 92,
      trainers: 5,
      established: '2018',
    },
    {
      id: '3',
      name: 'Development Academy',
      nameAr: 'أكاديمية التطوير',
      players: 68,
      trainers: 3,
      established: '2021',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('football.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('football.subtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            {t('football.manageFields')}
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            {t('football.newPlayer')}
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

      {/* Academies Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('football.academies')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {academies.map((academy) => (
            <Card key={academy.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                  {academy.nameAr}
                </CardTitle>
                <CardDescription>
                  {t('football.establishedIn')} {academy.established}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('football.players')}</span>
                    <Badge variant="outline">{academy.players}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('football.trainers')}</span>
                    <Badge variant="outline">{academy.trainers}</Badge>
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

export default FootballDashboard;
