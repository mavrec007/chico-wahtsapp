
import React, { useEffect } from 'react';
import { DynamicForm } from '@/components/common/DynamicForm';
import { useCreateCoach, useUpdateCoach } from '@/hooks/useCoaches';
import { useDataStore } from '@/stores/useDataStore';
import { FormField } from '@/types';

export function CoachForm() {
  const { modals, closeModal } = useDataStore();
  const createMutation = useCreateCoach();
  const updateMutation = useUpdateCoach();

  const modal = modals['coach-form'];
  const isEdit = modal?.mode === 'edit';
  const defaultValues = modal?.data || {};

  const fields: FormField[] = [
    {
      name: 'specialty',
      label: 'التخصص',
      type: 'select',
      required: true,
      options: [
        { value: 'swimming', label: 'سباحة' },
        { value: 'football', label: 'كرة قدم' },
        { value: 'basketball', label: 'كرة سلة' },
        { value: 'tennis', label: 'تنس' },
        { value: 'fitness', label: 'لياقة بدنية' },
      ],
    },
    {
      name: 'certification',
      label: 'الشهادة',
      type: 'text',
      placeholder: 'أدخل الشهادة المهنية',
    },
    {
      name: 'experience_years',
      label: 'سنوات الخبرة',
      type: 'number',
      placeholder: '0',
    },
    {
      name: 'email',
      label: 'البريد الإلكتروني',
      type: 'email',
      placeholder: 'coach@example.com',
    },
    {
      name: 'phone',
      label: 'رقم الهاتف',
      type: 'text',
      placeholder: '+966xxxxxxxxx',
    },
    {
      name: 'hourly_rate',
      label: 'الأجر بالساعة (ريال)',
      type: 'number',
      placeholder: '0.00',
    },
  ];

  const handleSubmit = async (data: any) => {
    try {
      if (isEdit) {
        await updateMutation.mutateAsync({
          id: defaultValues.id,
          data,
        });
      } else {
        await createMutation.mutateAsync(data);
      }
      closeModal('coach-form');
    } catch (error) {
      console.error('Error saving coach:', error);
    }
  };

  const handleCancel = () => {
    closeModal('coach-form');
  };

  if (!modal?.open) return null;

  return (
    <DynamicForm
      fields={fields}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={createMutation.isPending || updateMutation.isPending}
      submitText={isEdit ? 'تحديث المدرب' : 'إضافة المدرب'}
    />
  );
}
