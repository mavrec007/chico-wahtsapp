
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CoachForm } from './CoachForm';
import { useDataStore } from '@/stores/useDataStore';

export function CoachModal() {
  const { modals, closeModal } = useDataStore();
  const coachModal = modals['coach-form'];

  return (
    <Dialog 
      open={coachModal?.open || false} 
      onOpenChange={() => closeModal('coach-form')}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {coachModal?.mode === 'edit' ? 'تعديل المدرب' : 'إضافة مدرب جديد'}
          </DialogTitle>
        </DialogHeader>
        <CoachForm />
      </DialogContent>
    </Dialog>
  );
}
