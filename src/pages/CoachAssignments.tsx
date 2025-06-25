
import React, { useState } from 'react';
import { useCoachAssignments, useDeleteCoachAssignment } from '@/hooks/useCoachAssignments';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, FileText } from 'lucide-react';
import { CoachAssignment } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ConfirmDeleteModal from '@/components/forms/ConfirmDeleteModal';
import { toast } from 'sonner';

const CoachAssignments: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedAssignment, setSelectedAssignment] = useState<CoachAssignment | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data, isLoading, error } = useCoachAssignments({
    page,
    pageSize: 10,
    search,
  });

  const deleteAssignmentMutation = useDeleteCoachAssignment();

  const handleCreateAssignment = () => {
    setSelectedAssignment(null);
    setIsFormOpen(true);
  };

  const handleEditAssignment = (assignment: CoachAssignment) => {
    setSelectedAssignment(assignment);
    setIsFormOpen(true);
  };

  const handleDeleteAssignment = (assignment: CoachAssignment) => {
    setSelectedAssignment(assignment);
    setIsDeleteOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedAssignment(null);
    toast.success(selectedAssignment ? 'تم تحديث التكليف بنجاح' : 'تم إنشاء التكليف بنجاح');
  };

  const handleDeleteConfirm = async () => {
    if (!selectedAssignment) return;
    
    try {
      await deleteAssignmentMutation.mutateAsync(selectedAssignment.id);
      setIsDeleteOpen(false);
      setSelectedAssignment(null);
    } catch (error) {
      console.error('Error deleting assignment:', error);
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
        <h1 className="text-3xl font-bold">تكاليف المدربين</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateAssignment}>
              <Plus className="w-4 h-4 mr-2" />
              إضافة تكليف جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedAssignment ? 'تعديل التكليف' : 'إضافة تكليف جديد'}
              </DialogTitle>
            </DialogHeader>
            {/* Assignment form would go here */}
            <div className="p-4 text-center text-muted-foreground">
              نموذج التكليف سيتم إضافته قريباً
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            قائمة التكاليف
          </CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث في التكاليف..."
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
                <TableHead>نوع التدريب</TableHead>
                <TableHead>تاريخ البداية</TableHead>
                <TableHead>تاريخ النهاية</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">{assignment.training_type}</TableCell>
                  <TableCell>
                    {new Date(assignment.start_date).toLocaleDateString('ar-SA')}
                  </TableCell>
                  <TableCell>
                    {assignment.end_date ? new Date(assignment.end_date).toLocaleDateString('ar-SA') : 'مستمر'}
                  </TableCell>
                  <TableCell>
                    {new Date(assignment.created_at).toLocaleDateString('ar-SA')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditAssignment(assignment)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteAssignment(assignment)}
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
              لا توجد تكاليف مسجلة حالياً
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        message={`هل أنت متأكد من حذف هذا التكليف؟ لا يمكن التراجع عن هذا الإجراء.`}
        isLoading={deleteAssignmentMutation.isPending}
      />
    </div>
  );
};

export default CoachAssignments;
