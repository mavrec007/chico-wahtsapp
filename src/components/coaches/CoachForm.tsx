
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateCoach, useUpdateCoach } from '@/hooks/useCoaches';
import { Coach } from '@/types';

const coachFormSchema = z.object({
  specialty: z.string().min(1, 'التخصص مطلوب'),
  experience_years: z.number().min(0, 'سنوات الخبرة يجب أن تكون رقم موجب').optional(),
  hourly_rate: z.number().min(0, 'السعر يجب أن يكون رقم موجب').optional(),
  email: z.string().email('البريد الإلكتروني غير صحيح').optional().or(z.literal('')),
  phone: z.string().optional(),
  certification: z.string().optional(),
});

type CoachFormData = z.infer<typeof coachFormSchema>;

interface CoachFormProps {
  coach?: Coach | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const CoachForm: React.FC<CoachFormProps> = ({
  coach,
  onSuccess,
  onCancel,
}) => {
  const createCoachMutation = useCreateCoach();
  const updateCoachMutation = useUpdateCoach();

  const form = useForm<CoachFormData>({
    resolver: zodResolver(coachFormSchema),
    defaultValues: {
      specialty: coach?.specialty || '',
      experience_years: coach?.experience_years || 0,
      hourly_rate: coach?.hourly_rate || 0,
      email: coach?.email || '',
      phone: coach?.phone || '',
      certification: coach?.certification || '',
    },
  });

  const onSubmit = async (data: CoachFormData) => {
    try {
      // Ensure specialty is always present for the create/update operations
      const coachData = {
        specialty: data.specialty,
        experience_years: data.experience_years || 0,
        hourly_rate: data.hourly_rate || 0,
        email: data.email || '',
        phone: data.phone || '',
        certification: data.certification || '',
      };

      if (coach) {
        await updateCoachMutation.mutateAsync({ id: coach.id, data: coachData });
      } else {
        await createCoachMutation.mutateAsync(coachData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error submitting coach:', error);
    }
  };

  const isLoading = createCoachMutation.isPending || updateCoachMutation.isPending;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="specialty">التخصص</Label>
        <Input
          id="specialty"
          {...form.register('specialty')}
          placeholder="أدخل التخصص"
        />
        {form.formState.errors.specialty && (
          <p className="text-sm text-red-600 mt-1">
            {form.formState.errors.specialty.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="experience_years">سنوات الخبرة</Label>
        <Input
          id="experience_years"
          type="number"
          min="0"
          {...form.register('experience_years', { valueAsNumber: true })}
          placeholder="0"
        />
        {form.formState.errors.experience_years && (
          <p className="text-sm text-red-600 mt-1">
            {form.formState.errors.experience_years.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="hourly_rate">السعر بالساعة (ر.س)</Label>
        <Input
          id="hourly_rate"
          type="number"
          min="0"
          step="0.01"
          {...form.register('hourly_rate', { valueAsNumber: true })}
          placeholder="0.00"
        />
        {form.formState.errors.hourly_rate && (
          <p className="text-sm text-red-600 mt-1">
            {form.formState.errors.hourly_rate.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input
          id="email"
          type="email"
          {...form.register('email')}
          placeholder="example@domain.com"
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-600 mt-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">رقم الهاتف</Label>
        <Input
          id="phone"
          {...form.register('phone')}
          placeholder="أدخل رقم الهاتف"
        />
      </div>

      <div>
        <Label htmlFor="certification">الشهادات</Label>
        <Input
          id="certification"
          {...form.register('certification')}
          placeholder="أدخل الشهادات"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? 'جاري الحفظ...' : (coach ? 'تحديث' : 'إنشاء')}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          إلغاء
        </Button>
      </div>
    </form>
  );
};
