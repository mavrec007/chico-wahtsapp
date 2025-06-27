import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  X,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';

// Sample data arrays
const bookingData = [
  { month: 'Jan', bookings: 245 },
  { month: 'Feb', bookings: 312 },
  { month: 'Mar', bookings: 289 },
  { month: 'Apr', bookings: 378 },
  { month: 'May', bookings: 456 },
  { month: 'Jun', bookings: 523 },
];

const revenueData = [
  { month: 'Jan', revenue: 12250, target: 15000 },
  { month: 'Feb', revenue: 15600, target: 15000 },
  { month: 'Mar', revenue: 14450, target: 15000 },
  { month: 'Apr', revenue: 18900, target: 18000 },
  { month: 'May', revenue: 22800, target: 20000 },
  { month: 'Jun', revenue: 26150, target: 25000 },
];

const activityData = [
  { name: 'Swimming Pool', percentage: 35, color: '#3B82F6' },
  { name: 'Football Field', percentage: 24, color: '#10B981' },
  { name: 'Basketball Court', percentage: 21, color: '#F59E0B' },
  { name: 'Tennis Court', percentage: 20, color: '#EF4444' },
];

const weeklyData = [
  { day: 'Mon', morning: 45, afternoon: 67, evening: 89 },
  { day: 'Tue', morning: 52, afternoon: 73, evening: 95 },
  { day: 'Wed', morning: 48, afternoon: 69, evening: 87 },
  { day: 'Thu', morning: 61, afternoon: 81, evening: 103 },
  { day: 'Fri', morning: 55, afternoon: 78, evening: 112 },
  { day: 'Sat', morning: 73, afternoon: 95, evening: 134 },
  { day: 'Sun', morning: 68, afternoon: 89, evening: 125 },
];

const stats = [
  { title: 'Total Bookings', value: '2,847', change: '+12.5%', trend: 'up', icon: Calendar, gradient: 'from-blue-500 to-blue-600', bgGradient: 'from-blue-50 to-blue-100' },
  { title: 'Active Members', value: '1,234', change: '+8.2%', trend: 'up', icon: Users, gradient: 'from-emerald-500 to-emerald-600', bgGradient: 'from-emerald-50 to-emerald-100' },
  { title: 'Monthly Revenue', value: '$26,150', change: '+15.3%', trend: 'up', icon: DollarSign, gradient: 'from-purple-500 to-purple-600', bgGradient: 'from-purple-50 to-purple-100' },
  { title: 'Occupancy Rate', value: '87.3%', change: '+3.1%', trend: 'up', icon: Activity, gradient: 'from-orange-500 to-orange-600', bgGradient: 'from-orange-50 to-orange-100' },
];

export default function  Dashboard() {
  const { t } = useTranslation();
  const [showFilter, setShowFilter] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('dashboard.goodMorning');
    if (hour < 18) return t('dashboard.goodAfternoon');
    return t('dashboard.goodEvening');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900">
              {getGreeting()}, {t('dashboard.analyticsTitle')}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              {t('dashboard.analyticsSubtitle')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setShowFilter(true)} className="sm:hidden">
              <Filter className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="hidden sm:flex gap-2">
              <Filter className="w-4 h-4" />
              {t('dashboard.filter')}
            </Button>
            <Button className="flex gap-2 bg-gradient-to-r from-blue-600 to-indigo-600">
              <Download className="w-4 h-4" />
              {t('dashboard.exportReport')}
            </Button>
          </div>
        </motion.div>

        {/* Filter Panel */}
        {showFilter && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
            <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{t('dashboard.filter')}</h2>
                <Button variant="ghost" onClick={() => setShowFilter(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              {/* Filter form goes here */}
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
            return (
              <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <Card className="relative group hover:scale-105 transition-transform">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-75`} />
                  <CardContent className="relative p-6 space-y-1">
                    <div className="flex justify-between items-center mb-2">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="flex items-center gap-1">
                        <TrendIcon className="w-3 h-3" /> {stat.change}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard
            delay={0.3}
            icon={<BarChart3 className="w-5 h-5 text-blue-600" />}
            title={t('dashboard.monthlyBookingsTrend')}
            desc={t('dashboard.bookingVolumeDesc')}
          >
            <ChartContainer className="w-full h-64" config={{ bookings: { label: 'Bookings' } }}>  
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="bookings" fill="#3B82F6" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </ChartCard>

          <ChartCard
            delay={0.4}
            icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
            title={t('dashboard.revenueVsTarget')}
            desc={t('dashboard.revenuePerformanceDesc')}
          >
            <ChartContainer className="w-full h-64" config={{ revenue: { label: 'Revenue' }, target: { label: 'Target' } }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} dot={{ r:4 }} />
                  <Line type="monotone" dataKey="target" stroke="#6EE7B7" strokeDasharray="5 5" strokeWidth={2} dot={{ r:3 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </ChartCard>

          <ChartCard
            delay={0.5}
            icon={<Activity className="w-5 h-5 text-purple-600" />}
            title={t('dashboard.activityDistribution')}
            desc={t('dashboard.bookingDistributionDesc')}
          >
            <ChartContainer className="w-full h-64" config={{ percentage: { label: '%' } }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={activityData} dataKey="percentage" innerRadius={40} outerRadius={80}>  
                    {activityData.map((entry,i)=><Cell key={i} fill={entry.color}/>)}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </ChartCard>

          <ChartCard
            delay={0.6}
            icon={<Calendar className="w-5 h-5 text-orange-600" />}
            title={t('dashboard.weeklyUsagePattern')}
            desc={t('dashboard.usagePatternDesc')}
          >
            <ChartContainer className="w-full h-64" config={{ morning: { label: 'Morning' }, afternoon: { label: 'Afternoon' }, evening: { label: 'Evening' } }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="morning" fill="#F59E0B" stackId="1" />
                  <Area type="monotone" dataKey="afternoon" fill="#F97316" stackId="1" />
                  <Area type="monotone" dataKey="evening" fill="#EA580C" stackId="1" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

// Reusable ChartCard wrapper
function ChartCard({ delay, icon, title, desc, children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Card className="bg-white p-4 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            {icon} {title}
          </CardTitle>
          <CardDescription className="text-sm text-slate-600">{desc}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
}
