
import React from 'react';
import { CoachesTable } from '@/components/coaches/CoachesTable';
import { CoachModal } from '@/components/coaches/CoachModal';

const Coaches: React.FC = () => {
  return (
    <div className="space-y-6">
      <CoachesTable />
      <CoachModal />
    </div>
  );
};

export default Coaches;
