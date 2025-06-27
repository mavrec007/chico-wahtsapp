
import { Department, SwimmingDepartment, FootballDepartment, FieldDepartment } from '@/types/departments';
import { Users, Waves, MapPin, Clock, GraduationCap, School } from 'lucide-react';

export const SWIMMING_CATEGORIES = {
  PRIVATE: 'private' as const,
  SCHOOL: 'school' as const,
  FREE_PERIOD: 'free-period' as const,
};

export const FIELD_TYPES = {
  FOOTBALL: 'football' as const,
  BASKETBALL: 'basketball' as const,
  TENNIS: 'tennis' as const,
  SWIMMING_POOL: 'swimming-pool' as const,
  MULTI_PURPOSE: 'multi-purpose' as const,
};

export const swimmingDepartments: SwimmingDepartment[] = [
  {
    id: 'swimming-private',
    name: 'Private Swimming',
    nameAr: 'السباحة الخاصة',
    type: 'swimming',
    category: 'private',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'swimming-school',
    name: 'School Swimming',
    nameAr: 'مدارس السباحة',
    type: 'swimming',
    category: 'school',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'swimming-free-period',
    name: 'Free Period Swimming',
    nameAr: 'الفترة الحرة للسباحة',
    type: 'swimming',
    category: 'free-period',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const departmentConfig = {
  swimming: {
    private: {
      icon: Users,
      color: 'blue',
      requiresTrainer: true,
      requiresClient: true,
    },
    school: {
      icon: School,
      color: 'green',
      requiresTrainer: true,
      requiresClient: true,
    },
    'free-period': {
      icon: Clock,
      color: 'purple',
      requiresTrainer: false,
      requiresClient: true,
    },
  },
  football: {
    academy: {
      icon: GraduationCap,
      color: 'orange',
      requiresTrainer: true,
      requiresPlayer: true,
    },
  },
  field: {
    management: {
      icon: MapPin,
      color: 'red',
      requiresBooking: true,
    },
  },
};
