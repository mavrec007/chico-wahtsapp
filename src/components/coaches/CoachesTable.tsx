
import React, { useState } from 'react';
import { useCoaches, useDeleteCoach } from '@/hooks/useCoaches';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, UserCheck } from 'lucide-react';
import { Coach } from '@/types';
import ConfirmDeleteModal from '@/components/forms/ConfirmDeleteModal';

interface CoachesTableProps {
  onEdit?: (coach: Coach) => void;
  onAdd?: () => void;
}

export const CoachesTable: React.FC<CoachesTableProps> = ({ onEdit, onAdd }) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data, isLoading, error } = useCoaches({
    page,
    pageSize: 10,
    search,
  });

  const deleteCoachMutation = useDeleteCoach();

  const handleDeleteCoach = (coach: Coach) => {
    setSelectedCoach(coach);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCoach) return;
    
    try {
      await deleteCoachMutation.mutateAsync(selectedCoach.id);
      setIsDeleteOpen(false);
      setSelectedCoach(null);
    } catch (error) {
      console.error('Error deleting coach:', error);
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
        <h1 className="text-3xl font-bold">إدارة المدربين</h1>
        <Button onClick={onAdd}>
          <Plus className="w-4 h-4 mr-2" />
          إضافة مدرب جديد
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            قائمة المدربين
          </CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث في المدربين..."
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
                <TableHead>التخصص</TableHead>
                <TableHead>سنوات الخبرة</TableHead>
                <TableHead>السعر/ساعة</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>الهاتف</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((coach) => (
                <TableRow key={coach.id}>
                  <TableCell className="font-medium">{coach.specialty}</TableCell>
                  <TableCell>
                    {coach.experience_years ? (
                      <Badge variant="secondary">{coach.experience_years} سنوات</Badge>
                    ) : (
                      'غير محدد'
                    )}
                  </TableCell>
                  <TableCell>
                    {coach.hourly_rate ? `${coach.hourly_rate} ر.س` : 'غير محدد'}
                  </TableCell>
                  <TableCell>{coach.email || 'غير محدد'}</TableCell>
                  <TableCell>{coach.phone || 'غير محدد'}</TableCell>
                  <TableCell>
                    {new Date(coach.created_at).toLocaleDateString('ar-SA')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit?.(coach)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteCoach(coach)}
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
              لا توجد مدربين مسجلين حالياً
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        message={`هل أنت متأكد من حذف المدرب "${selectedCoach?.specialty}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        isLoading={deleteCoachMutation.isPending}
      />
    </div>
  );
};
