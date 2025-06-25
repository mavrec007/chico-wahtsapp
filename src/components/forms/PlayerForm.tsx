
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Player } from '@/types';

const playerFormSchema = z.object({
  position: z.string().min(1, 'المركز مطلوب'),
  team: z.string().min(1, 'الفريق مطلوب'),
  email: z.string().email('البريد الإلكتروني غير صحيح').optional().or(z.literal('')),
  phone: z.string().optional(),
  date_of_birth: z.string().optional(),
  rating: z.number().min(0).max(10).optional(),
});

type PlayerFormData = z.infer<typeof playerFormSchema>;

interface PlayerFormProps {
  player?: Player | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const PlayerForm: React.FC<PlayerFormProps> = ({
  player,
  onSuccess,
  onCancel,
}) => {
  const form = useForm<PlayerFormData>({
    resolver: zodResolver(playerFormSchema),
    defaultValues: {
      position: player?.position || '',
      team: player?.team || '',
      email: player?.email || '',
      phone: player?.phone || '',
      date_of_birth: player?.date_of_birth || '',
      rating: player?.rating || 0,
    },
  });

  const onSubmit = async (data: PlayerFormData) => {
    try {
      // This would use the hook for create/update
      console.log('Submitting player data:', data);
      onSuccess();
    } catch (error) {
      console.error('Error submitting player:', error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="position">المركز</Label>
        <Input
          id="position"
          {...form.register('position')}
          placeholder="أدخل المركز"
        />
        {form.formState.errors.position && (
          <p className="text-sm text-red-600 mt-1">
            {form.formState.errors.position.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="team">الفريق</Label>
        <Input
          id="team"
          {...form.register('team')}
          placeholder="أدخل اسم الفريق"
        />
        {form.formState.errors.team && (
          <p className="text-sm text-red-600 mt-1">
            {form.formState.errors.team.message}
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
        <Label htmlFor="date_of_birth">تاريخ الميلاد</Label>
        <Input
          id="date_of_birth"
          type="date"
          {...form.register('date_of_birth')}
        />
      </div>

      <div>
        <Label htmlFor="rating">التقييم (0-10)</Label>
        <Input
          id="rating"
          type="number"
          min="0"
          max="10"
          {...form.register('rating', { valueAsNumber: true })}
          placeholder="0"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          {player ? 'تحديث' : 'إنشاء'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          إلغاء
        </Button>
      </div>
    </form>
  );
};
