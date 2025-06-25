
import React from 'react';
import { CoachesTable } from '@/components/coaches/CoachesTable';
import { CoachForm } from '@/components/coaches/CoachForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDataStore } from '@/stores/useDataStore';

const Coaches: React.FC = () => {
  const { modals } = useDataStore();
  const coachModal = modals['coach-form'];

  return (
    <div className="space-y-6">
      <CoachesTable />
      
      <Dialog open={coachModal?.open} onOpenChange={() => {}}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {coachModal?.mode === 'edit' ? 'تعديل المدرب' : 'إضافة مدرب جديد'}
            </DialogTitle>
          </DialogHeader>
          <CoachForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Coaches;
