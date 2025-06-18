
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, CreditCard, Activity, TrendingUp, Clock, MapPin } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'إجمالي الحجوزات',
      value: '1,234',
      change: '+20.1%',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'العملاء النشطون',
      value: '573',
      change: '+15.3%',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'الإيرادات',
      value: '45,678 ر.س',
      change: '+12.5%',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'الأنشطة المتاحة',
      value: '28',
      change: '+5.4%',
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentBookings = [
    { id: 1, client: 'أحمد محمد', activity: 'حمام السباحة', time: '10:00 ص', status: 'مؤكد' },
    { id: 2, client: 'فاطمة أحمد', activity: 'ملعب كرة القدم', time: '2:00 م', status: 'قيد الانتظار' },
    { id: 3, client: 'محمد علي', activity: 'ملعب السلة', time: '4:00 م', status: 'مؤكد' },
    { id: 4, client: 'نورا سالم', activity: 'حمام السباحة', time: '6:00 م', status: 'مؤكد' }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">مرحباً، {user?.name}</h1>
        <p className="text-blue-100">إليك نظرة عامة على أداء المرافق الرياضية اليوم</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change} من الشهر الماضي
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                الحجوزات الحديثة
              </CardTitle>
              <CardDescription>آخر الحجوزات المسجلة في النظام</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{booking.client}</p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {booking.activity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{booking.time}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === 'مؤكد' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-purple-600" />
                الأنشطة الشائعة
              </CardTitle>
              <CardDescription>الأنشطة الأكثر حجزاً هذا الأسبوع</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>حمام السباحة</span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">85%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>ملعب كرة القدم</span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">72%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>ملعب السلة</span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '64%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">64%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>ملعب التنس</span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">45%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}