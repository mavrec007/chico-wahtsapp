
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coachesService } from '@/services/coaches.service';
import { Coach, PaginationParams } from '@/types';
import { toast } from 'sonner';

export const useCoaches = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['coaches', params],
    queryFn: () => coachesService.getAll(params),
  });
};

export const useCoach = (id: string) => {
  return useQuery({
    queryKey: ['coach', id],
    queryFn: () => coachesService.getById(id),
    enabled: !!id,
  });
};

export const useCreateCoach = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<Coach, 'id' | 'created_at' | 'updated_at'>) =>
      coachesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coaches'] });
      toast.success('تم إنشاء المدرب بنجاح');
    },
    onError: (error) => {
      toast.error('فشل في إنشاء المدرب');
      console.error('Error creating coach:', error);
    },
  });
};

export const useUpdateCoach = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Coach> }) =>
      coachesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coaches'] });
      toast.success('تم تحديث المدرب بنجاح');
    },
    onError: (error) => {
      toast.error('فشل في تحديث المدرب');
      console.error('Error updating coach:', error);
    },
  });
};

export const useDeleteCoach = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => coachesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coaches'] });
      toast.success('تم حذف المدرب بنجاح');
    },
    onError: (error) => {
      toast.error('فشل في حذف المدرب');
      console.error('Error deleting coach:', error);
    },
  });
};

export const useAvailableCoaches = (date: string) => {
  return useQuery({
    queryKey: ['coaches', 'available', date],
    queryFn: () => coachesService.getAvailableCoaches(date),
    enabled: !!date,
  });
};
