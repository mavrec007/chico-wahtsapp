
import React, { useState } from 'react';
import { usePayments, useDeletePayment } from '@/hooks/usePayments';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, CreditCard } from 'lucide-react';
import { Payment } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ConfirmDeleteModal from '@/components/forms/ConfirmDeleteModal';
import { toast } from 'sonner';

const Payments: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data, isLoading, error } = usePayments({
    page,
    pageSize: 10,
    search,
  });

  const deletePaymentMutation = useDeletePayment();

  const handleCreatePayment = () => {
    setSelectedPayment(null);
    setIsFormOpen(true);
  };

  const handleEditPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsFormOpen(true);
  };

  const handleDeletePayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDeleteOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedPayment(null);
    toast.success(selectedPayment ? 'تم تحديث الدفعة بنجاح' : 'تم إنشاء الدفعة بنجاح');
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPayment) return;
    
    try {
      await deletePaymentMutation.mutateAsync(selectedPayment.id);
      setIsDeleteOpen(false);
      setSelectedPayment(null);
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default">مكتملة</Badge>;
      case 'pending':
        return <Badge variant="secondary">معلقة</Badge>;
      case 'failed':
        return <Badge variant="destructive">فاشلة</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
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
        <h1 className="text-3xl font-bold">إدارة المدفوعات</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreatePayment}>
              <Plus className="w-4 h-4 mr-2" />
              إضافة دفعة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedPayment ? 'تعديل الدفعة' : 'إضافة دفعة جديدة'}
              </DialogTitle>
            </DialogHeader>
            {/* Payment form would go here */}
            <div className="p-4 text-center text-muted-foreground">
              نموذج الدفعة سيتم إضافته قريباً
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            قائمة المدفوعات
          </CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث في المدفوعات..."
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
                <TableHead>المبلغ</TableHead>
                <TableHead>طريقة الدفع</TableHead>
                <TableHead>نوع الدفع</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>رقم المرجع</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.amount} ر.س</TableCell>
                  <TableCell>{payment.payment_method || 'غير محدد'}</TableCell>
                  <TableCell>{payment.payment_type || 'غير محدد'}</TableCell>
                  <TableCell>{getStatusBadge(payment.status || 'pending')}</TableCell>
                  <TableCell>{payment.reference_number || 'غير محدد'}</TableCell>
                  <TableCell>
                    {new Date(payment.created_at).toLocaleDateString('ar-SA')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditPayment(payment)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDeletePayment(payment)}
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
              لا توجد مدفوعات مسجلة حالياً
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        message={`هل أنت متأكد من حذف هذه الدفعة؟ لا يمكن التراجع عن هذا الإجراء.`}
        isLoading={deletePaymentMutation.isPending}
      />
    </div>
  );
};

export default Payments;
