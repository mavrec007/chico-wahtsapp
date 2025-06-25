
import React, { useState } from 'react';
import { useFacilities, useDeleteFacility } from '@/hooks/useFacilities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Building } from 'lucide-react';
import { Facility } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ConfirmDeleteModal from '@/components/forms/ConfirmDeleteModal';
import { toast } from 'sonner';

const Facilities: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data, isLoading, error } = useFacilities({
    page,
    pageSize: 10,
    search,
  });

  const deleteFailityMutation = useDeleteFacility();

  const handleCreateFacility = () => {
    setSelectedFacility(null);
    setIsFormOpen(true);
  };

  const handleEditFacility = (facility: Facility) => {
    setSelectedFacility(facility);
    setIsFormOpen(true);
  };

  const handleDeleteFacility = (facility: Facility) => {
    setSelectedFacility(facility);
    setIsDeleteOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedFacility(null);
    toast.success(selectedFacility ? 'تم تحديث المرفق بنجاح' : 'تم إنشاء المرفق بنجاح');
  };

  const handleDeleteConfirm = async () => {
    if (!selectedFacility) return;
    
    try {
      await deleteFailityMutation.mutateAsync(selectedFacility.id);
      setIsDeleteOpen(false);
      setSelectedFacility(null);
    } catch (error) {
      console.error('Error deleting facility:', error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">خطأ في تحميل البيانات</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">إدارة المرافق</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateFacility}>
              <Plus className="w-4 h-4 mr-2" />
              إضافة مرفق جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedFacility ? 'تعديل المرفق' : 'إضافة مرفق جديد'}
              </DialogTitle>
            </DialogHeader>
            {/* Facility form would go here */}
            <div className="p-4 text-center text-muted-foreground">
              نموذج المرفق سيتم إضافته قريباً
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            قائمة المرافق
          </CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث في المرافق..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>السعة</TableHead>
                <TableHead>السعر/ساعة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((facility) => (
                <TableRow key={facility.id}>
                  <TableCell className="font-medium">{facility.name}</TableCell>
                  <TableCell>{facility.type}</TableCell>
                  <TableCell>{facility.capacity} شخص</TableCell>
                  <TableCell>{facility.hourly_rate} ر.س</TableCell>
                  <TableCell>
                    <Badge variant={facility.active ? "default" : "secondary"}>
                      {facility.active ? "نشط" : "غير نشط"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(facility.created_at).toLocaleDateString('ar-SA')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditFacility(facility)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteFacility(facility)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {data?.data.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              لا توجد مرافق مسجلة حالياً
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        message={`هل أنت متأكد من حذف المرفق "${selectedFacility?.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        isLoading={deleteFailityMutation.isPending}
      />
    </div>
  );
};

export default Facilities;
