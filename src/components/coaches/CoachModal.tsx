
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Coach } from '@/types';
import { CoachForm } from './CoachForm';

interface CoachModalProps {
  isOpen?: boolean;
  coach?: Coach | null;
  onClose?: () => void;
}

export const CoachModal: React.FC<CoachModalProps> = ({
  isOpen = false,
  coach = null,
  onClose = () => {},
}) => {
  const handleSuccess = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {coach ? 'تعديل المدرب' : 'إضافة مدرب جديد'}
          </DialogTitle>
        </DialogHeader>
        <CoachForm
          coach={coach}
          onSuccess={handleSuccess}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
