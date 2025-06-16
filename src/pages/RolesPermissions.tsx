
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Shield, 
  Key, 
  UserCheck, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Users,
  Settings,
  Activity,
  Search
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSidebar } from '@/components/ui/sidebar';

export function RolesPermissions() {
  const { isRTL, t } = useLanguage();
  const { state } = useSidebar();
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate dynamic margin class
  const getContentMarginClass = () => {
    const isExpanded = state === 'expanded';
    if (isRTL) {
      return isExpanded ? 'content-margin-rtl-expanded' : 'content-margin-rtl-collapsed';
    } else {
      return isExpanded ? 'content-margin-ltr-expanded' : 'content-margin-ltr-collapsed';
    }
  };

  const roles = [
    {
      id: 1,
      name: 'مدير النظام',
      description: 'صلاحيات كاملة لإدارة جميع أجزاء النظام',
      usersCount: 2,
      permissions: ['read', 'write', 'delete', 'admin'],
      color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    },
    {
      id: 2,
      name: 'مدير المرافق',
      description: 'إدارة المرافق والحجوزات والعملاء',
      usersCount: 5,
      permissions: ['read', 'write', 'bookings'],
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    },
    {
      id: 3,
      name: 'موظف الاستقبال',
      description: 'إدارة الحجوزات والعملاء فقط',
      usersCount: 8,
      permissions: ['read', 'bookings'],
      color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    },
    {
      id: 4,
      name: 'محاسب',
      description: 'إدارة المالية والفواتير',
      usersCount: 3,
      permissions: ['read', 'write', 'accounting'],
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
    }
  ];

  const permissions = [
    {
      id: 'read',
      name: 'عرض البيانات',
      description: 'إمكانية عرض وقراءة البيانات',
      module: 'عام'
    },
    {
      id: 'write',
      name: 'تعديل البيانات',
      description: 'إمكانية إضافة وتعديل البيانات',
      module: 'عام'
    },
    {
      id: 'delete',
      name: 'حذف البيانات',
      description: 'إمكانية حذف البيانات',
      module: 'عام'
    },
    {
      id: 'admin',
      name: 'إدارة النظام',
      description: 'صلاحيات إدارية كاملة',
      module: 'الإدارة'
    },
    {
      id: 'bookings',
      name: 'إدارة الحجوزات',
      description: 'إدارة حجوزات المرافق',
      module: 'الحجوزات'
    },
    {
      id: 'accounting',
      name: 'إدارة المالية',
      description: 'إدارة الفواتير والمدفوعات',
      module: 'المحاسبة'
    }
  ];

  return (
    <div className={`min-h-screen ${getContentMarginClass()} animate-fade-in`}>
      <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 ${isRTL ? 'lg:flex-row-reverse' : ''} animate-slide-up`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h1 className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
              إدارة الأدوار والصلاحيات
            </h1>
            <p className="text-muted-foreground text-lg">
              تحديد وإدارة الأدوار والصلاحيات لمستخدمي النظام
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''} animate-slide-in-right`}>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gradient-primary text-white hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  دور جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card border-0 shadow-xl">
                <DialogHeader>
                  <DialogTitle>إضافة دور جديد</DialogTitle>
                  <DialogDescription>
                    قم بإنشاء دور جديد وتحديد الصلاحيات المناسبة له
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input placeholder="اسم الدور" />
                  <Input placeholder="وصف الدور" />
                  {/* Add role creation form here */}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card hover-glow border-0 shadow-lg animate-scale-in">
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary shadow-lg">
                  <Shield className="w-6 h-6" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-2xl font-bold text-gradient">{roles.length}</p>
                <p className="text-muted-foreground text-sm">إجمالي الأدوار</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-glow border-0 shadow-lg animate-scale-in" style={{ animationDelay: '100ms' }}>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-green-500/15 to-emerald-500/15 text-green-600 shadow-lg">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-2xl font-bold text-gradient">18</p>
                <p className="text-muted-foreground text-sm">إجمالي المستخدمين</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-glow border-0 shadow-lg animate-scale-in" style={{ animationDelay: '200ms' }}>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-purple-500/15 to-violet-500/15 text-purple-600 shadow-lg">
                  <Key className="w-6 h-6" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-2xl font-bold text-gradient">{permissions.length}</p>
                <p className="text-muted-foreground text-sm">الصلاحيات المتاحة</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-glow border-0 shadow-lg animate-scale-in" style={{ animationDelay: '300ms' }}>
            <CardHeader className="pb-3">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-orange-500/15 to-amber-500/15 text-orange-600 shadow-lg">
                  <Activity className="w-6 h-6" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-2xl font-bold text-gradient">15</p>
                <p className="text-muted-foreground text-sm">الأدوار النشطة</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Roles Table */}
        <Card className="glass-card hover-glow border-0 shadow-lg animate-fade-in">
          <CardHeader>
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <CardTitle className="text-gradient text-xl mb-2">إدارة الأدوار</CardTitle>
                <CardDescription className="text-base">
                  عرض وإدارة جميع الأدوار والصلاحيات المحددة
                </CardDescription>
              </div>
              <div className="p-3 rounded-xl gradient-primary text-white shadow-lg">
                <Shield className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <div className="relative flex-1 max-w-md">
                <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground`} />
                <Input
                  placeholder="البحث في الأدوار..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`${isRTL ? 'pr-10' : 'pl-10'} glass-effect`}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="table-professional rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="table-header">
                    <TableHead className={`font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>اسم الدور</TableHead>
                    <TableHead className={`font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>الوصف</TableHead>
                    <TableHead className={`font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>عدد المستخدمين</TableHead>
                    <TableHead className={`font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>الصلاحيات</TableHead>
                    <TableHead className={`font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role, index) => (
                    <TableRow 
                      key={role.id} 
                      className="table-row animate-slide-in-left"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <TableCell className="font-medium">
                        <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                            <Shield className="h-4 w-4" />
                          </div>
                          <span>{role.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">{role.description}</TableCell>
                      <TableCell>
                        <Badge className={role.color}>
                          {role.usersCount} مستخدم
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map((permission) => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permissions.find(p => p.id === permission)?.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Permissions Table */}
        <Card className="glass-card hover-glow border-0 shadow-lg animate-fade-in">
          <CardHeader>
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div>
                <CardTitle className="text-gradient text-xl mb-2">إدارة الصلاحيات</CardTitle>
                <CardDescription className="text-base">
                  عرض وإدارة جميع الصلاحيات المتاحة في النظام
                </CardDescription>
              </div>
              <div className="p-3 rounded-xl gradient-primary text-white shadow-lg">
                <Key className="w-6 h-6" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="table-professional rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="table-header">
                    <TableHead className={`font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>الصلاحية</TableHead>
                    <TableHead className={`font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>الوصف</TableHead>
                    <TableHead className={`font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>المودول</TableHead>
                    <TableHead className={`font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissions.map((permission, index) => (
                    <TableRow 
                      key={permission.id} 
                      className="table-row animate-slide-in-right"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <TableCell className="font-medium">
                        <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                            <Key className="h-4 w-4" />
                          </div>
                          <span>{permission.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{permission.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{permission.module}</Badge>
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
