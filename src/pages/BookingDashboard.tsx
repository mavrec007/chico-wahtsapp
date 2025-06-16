
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, Users, MapPin, Phone, Check, X, Moon, Sun, Waves, Target, TrendingUp, AlertCircle } from "lucide-react";

interface Booking {
  id: string;
  customerPhone: string;
  activityType: 'courts' | 'swimming';
  selectedTime: string;
  selectedDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentConfirmed: boolean;
  createdAt: string;
  details?: {
    courtType?: string;
    poolType?: 'free' | 'private';
    duration: number;
    price: number;
  };
}

const BookingDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    todayRevenue: 0,
    courtsBookings: 0,
    swimmingBookings: 0
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Simulate real-time data updates
  useEffect(() => {
    const mockBookings: Booking[] = [
      {
        id: '1',
        customerPhone: '+966512345678',
        activityType: 'courts',
        selectedTime: '10:00',
        selectedDate: '2024-06-16',
        status: 'pending',
        paymentConfirmed: false,
        createdAt: new Date().toISOString(),
        details: {
          courtType: 'ملعب كرة قدم',
          duration: 2,
          price: 200
        }
      },
      {
        id: '2',
        customerPhone: '+966587654321',
        activityType: 'swimming',
        selectedTime: '14:00',
        selectedDate: '2024-06-16',
        status: 'confirmed',
        paymentConfirmed: true,
        createdAt: new Date().toISOString(),
        details: {
          poolType: 'private',
          duration: 1,
          price: 150
        }
      },
      {
        id: '3',
        customerPhone: '+966501234567',
        activityType: 'courts',
        selectedTime: '16:00',
        selectedDate: '2024-06-16',
        status: 'confirmed',
        paymentConfirmed: true,
        createdAt: new Date().toISOString(),
        details: {
          courtType: 'ملعب كرة سلة',
          duration: 1,
          price: 150
        }
      },
      {
        id: '4',
        customerPhone: '+966598765432',
        activityType: 'swimming',
        selectedTime: '18:00',
        selectedDate: '2024-06-16',
        status: 'pending',
        paymentConfirmed: false,
        createdAt: new Date().toISOString(),
        details: {
          poolType: 'free',
          duration: 2,
          price: 100
        }
      }
    ];

    setBookings(mockBookings);
    setStats({
      totalBookings: mockBookings.length,
      pendingBookings: mockBookings.filter(b => b.status === 'pending').length,
      confirmedBookings: mockBookings.filter(b => b.status === 'confirmed').length,
      todayRevenue: mockBookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + (b.details?.price || 0), 0),
      courtsBookings: mockBookings.filter(b => b.activityType === 'courts').length,
      swimmingBookings: mockBookings.filter(b => b.activityType === 'swimming').length
    });
  }, []);

  const handleConfirmBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'confirmed' as const, paymentConfirmed: true }
        : booking
    ));
    console.log(`تأكيد الحجز ${bookingId} - سيتم إرسال التأكيد للعميل عبر واتساب`);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const }
        : booking
    ));
    console.log(`إلغاء الحجز ${bookingId} - سيتم إرسال الإلغاء للعميل عبر واتساب`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500 dark:bg-amber-600';
      case 'confirmed': return 'bg-emerald-500 dark:bg-emerald-600';
      case 'cancelled': return 'bg-red-500 dark:bg-red-600';
      default: return 'bg-gray-500 dark:bg-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'معلق';
      case 'confirmed': return 'مؤكد';
      case 'cancelled': return 'ملغي';
      default: return 'غير محدد';
    }
  };

  const getActivityTypeArabic = (type: string) => {
    return type === 'courts' ? 'الملاعب' : 'حمام السباحة';
  };

  const filterBookingsByType = (type: 'courts' | 'swimming') => {
    return bookings.filter(booking => booking.activityType === type);
  };

  const BookingTable = ({ bookings: tableBookings }: { bookings: Booking[] }) => (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 dark:bg-slate-900">
            <TableHead className="text-right font-semibold text-slate-900 dark:text-slate-100">العميل</TableHead>
            <TableHead className="text-right font-semibold text-slate-900 dark:text-slate-100">النوع</TableHead>
            <TableHead className="text-right font-semibold text-slate-900 dark:text-slate-100">التاريخ والوقت</TableHead>
            <TableHead className="text-right font-semibold text-slate-900 dark:text-slate-100">المدة</TableHead>
            <TableHead className="text-right font-semibold text-slate-900 dark:text-slate-100">السعر</TableHead>
            <TableHead className="text-right font-semibold text-slate-900 dark:text-slate-100">الحالة</TableHead>
            <TableHead className="text-right font-semibold text-slate-900 dark:text-slate-100">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableBookings.map((booking) => (
            <TableRow key={booking.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Phone className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-slate-900 dark:text-slate-100">{booking.customerPhone}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-slate-700 dark:text-slate-300">
                  {booking.activityType === 'courts' ? booking.details?.courtType : 
                   booking.details?.poolType === 'private' ? 'برايفت' : 'فترة حرة'}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2 space-x-reverse text-slate-700 dark:text-slate-300">
                  <Calendar className="h-4 w-4" />
                  <span>{booking.selectedDate}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{booking.selectedTime}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-slate-700 dark:text-slate-300">{booking.details?.duration} ساعة</span>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{booking.details?.price} ريال</span>
              </TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(booking.status)} text-white`}>
                  {getStatusText(booking.status)}
                </Badge>
              </TableCell>
              <TableCell>
                {booking.status === 'pending' && (
                  <div className="flex space-x-2 space-x-reverse">
                    <Button 
                      onClick={() => handleConfirmBooking(booking.id)}
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleCancelBooking(booking.id)}
                      size="sm"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                {booking.status === 'confirmed' && (
                  <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                    مؤكد
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`} dir="rtl">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              لوحة تحكم الحجوزات الرياضية
            </h1>
            <p className="text-slate-600 dark:text-slate-400">إدارة حجوزات الملاعب وحمامات السباحة بكل سهولة</p>
          </div>
          <Button
            onClick={toggleDarkMode}
            variant="outline"
            size="icon"
            className="rounded-full border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isDarkMode ? 
              <Sun className="h-5 w-5 text-yellow-500" /> : 
              <Moon className="h-5 w-5 text-slate-600" />
            }
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">إجمالي الحجوزات</CardTitle>
              <Calendar className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs opacity-80 mt-1">جميع الحجوزات</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">حجوزات معلقة</CardTitle>
              <AlertCircle className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.pendingBookings}</div>
              <p className="text-xs opacity-80 mt-1">تحتاج موافقة</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-green-500 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">حجوزات مؤكدة</CardTitle>
              <Check className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.confirmedBookings}</div>
              <p className="text-xs opacity-80 mt-1">تم التأكيد</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">إيرادات اليوم</CardTitle>
              <TrendingUp className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.todayRevenue}</div>
              <p className="text-xs opacity-80 mt-1">ريال سعودي</p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Type Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
            <CardHeader>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-slate-900 dark:text-slate-100">الملاعب الرياضية</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">حجوزات الملاعب</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.courtsBookings}</div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
            <CardHeader>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
                  <Waves className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <CardTitle className="text-slate-900 dark:text-slate-100">حمام السباحة</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">حجوزات السباحة</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{stats.swimmingBookings}</div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Sections */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              جميع الحجوزات
            </TabsTrigger>
            <TabsTrigger value="courts" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Target className="h-4 w-4 mr-2" />
              الملاعب
            </TabsTrigger>
            <TabsTrigger value="swimming" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              <Waves className="h-4 w-4 mr-2" />
              حمام السباحة
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              <AlertCircle className="h-4 w-4 mr-2" />
              معلقة
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-slate-100 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  جميع الحجوزات
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  عرض شامل لجميع حجوزات الملاعب وحمام السباحة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookingTable bookings={bookings} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courts" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-slate-100 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-600" />
                  حجوزات الملاعب الرياضية
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  إدارة حجوزات ملاعب كرة القدم وكرة السلة والتنس
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookingTable bookings={filterBookingsByType('courts')} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="swimming" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-slate-100 flex items-center">
                  <Waves className="h-5 w-5 mr-2 text-cyan-600" />
                  حجوزات حمام السباحة
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  إدارة حجوزات الفترات الحرة والجلسات الخاصة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookingTable bookings={filterBookingsByType('swimming')} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-slate-100 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-amber-600" />
                  الحجوزات المعلقة
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  الحجوزات التي تحتاج لمراجعة وتأكيد
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookingTable bookings={bookings.filter(b => b.status === 'pending')} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bot Status */}
        <Card className="mt-8 bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-slate-100">حالة البوتات</CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              معلومات الاتصال مع بوتات واتساب وتليجرام
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-green-900 dark:text-green-100">بوت واتساب</p>
                    <p className="text-sm text-green-700 dark:text-green-300">للتفاعل مع العملاء</p>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white">متصل</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900 dark:text-blue-100">بوت تليجرام</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">لإدارة الحجوزات</p>
                  </div>
                </div>
                <Badge className="bg-blue-500 text-white">متصل</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingDashboard;
