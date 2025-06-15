
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, MapPin, Phone, Check, X } from "lucide-react";

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
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    todayRevenue: 0
  });

  // Simulate real-time data updates
  useEffect(() => {
    // Mock data for demonstration
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
          courtType: 'Football Court',
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
      }
    ];

    setBookings(mockBookings);
    setStats({
      totalBookings: mockBookings.length,
      pendingBookings: mockBookings.filter(b => b.status === 'pending').length,
      confirmedBookings: mockBookings.filter(b => b.status === 'confirmed').length,
      todayRevenue: mockBookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + (b.details?.price || 0), 0)
    });
  }, []);

  const handleConfirmBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'confirmed' as const, paymentConfirmed: true }
        : booking
    ));
    console.log(`Confirming booking ${bookingId} - This would send confirmation to customer via WhatsApp`);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const }
        : booking
    ));
    console.log(`Cancelling booking ${bookingId} - This would send cancellation to customer via WhatsApp`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getActivityTypeArabic = (type: string) => {
    return type === 'courts' ? 'ملاعب' : 'حمام سباحة';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة تحكم الحجوزات الرياضية</h1>
          <p className="text-gray-600">إدارة حجوزات الملاعب وحمامات السباحة</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الحجوزات</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">حجوزات معلقة</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingBookings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">حجوزات مؤكدة</CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.confirmedBookings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إيرادات اليوم</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.todayRevenue} ريال</div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Management */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">جميع الحجوزات</TabsTrigger>
            <TabsTrigger value="pending">معلقة</TabsTrigger>
            <TabsTrigger value="confirmed">مؤكدة</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status === 'pending' ? 'معلق' : booking.status === 'confirmed' ? 'مؤكد' : 'ملغي'}
                        </Badge>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <MapPin className="h-4 w-4" />
                          <span className="font-medium">{getActivityTypeArabic(booking.activityType)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm text-gray-600">{booking.customerPhone}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{booking.selectedDate}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{booking.selectedTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="font-semibold">{booking.details?.price} ريال</span>
                      </div>
                    </div>
                    
                    {booking.details && (
                      <div className="text-sm text-gray-600 mb-4">
                        {booking.activityType === 'courts' && booking.details.courtType && (
                          <p>نوع الملعب: {booking.details.courtType}</p>
                        )}
                        {booking.activityType === 'swimming' && booking.details.poolType && (
                          <p>نوع السباحة: {booking.details.poolType === 'free' ? 'فترة حرة' : 'برايفت'}</p>
                        )}
                        <p>المدة: {booking.details.duration} ساعة</p>
                      </div>
                    )}

                    {booking.status === 'pending' && (
                      <div className="flex space-x-2 space-x-reverse">
                        <Button 
                          onClick={() => handleConfirmBooking(booking.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          تأكيد الحجز
                        </Button>
                        <Button 
                          variant="destructive"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          إلغاء الحجز
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <div className="grid gap-4">
              {bookings.filter(b => b.status === 'pending').map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{getActivityTypeArabic(booking.activityType)}</p>
                        <p className="text-sm text-gray-600">{booking.customerPhone}</p>
                        <p className="text-sm text-gray-600">{booking.selectedDate} - {booking.selectedTime}</p>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <Button 
                          onClick={() => handleConfirmBooking(booking.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          تأكيد
                        </Button>
                        <Button 
                          variant="destructive"
                          onClick={() => handleCancelBooking(booking.id)}
                          size="sm"
                        >
                          إلغاء
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="confirmed" className="space-y-4">
            <div className="grid gap-4">
              {bookings.filter(b => b.status === 'confirmed').map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{getActivityTypeArabic(booking.activityType)}</p>
                        <p className="text-sm text-gray-600">{booking.customerPhone}</p>
                        <p className="text-sm text-gray-600">{booking.selectedDate} - {booking.selectedTime}</p>
                        <p className="text-sm font-semibold text-green-600">{booking.details?.price} ريال</p>
                      </div>
                      <Badge className="bg-green-500">مؤكد</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Bot Status Indicator */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>حالة البوتات</CardTitle>
            <CardDescription>معلومات الاتصال مع بوتات واتساب وتليجرام</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">بوت واتساب</p>
                  <p className="text-sm text-gray-600">للتفاعل مع العملاء</p>
                </div>
                <Badge className="bg-green-500">متصل</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">بوت تليجرام</p>
                  <p className="text-sm text-gray-600">لإدارة الحجوزات</p>
                </div>
                <Badge className="bg-green-500">متصل</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingDashboard;
