
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coachesService } from '@/services/coaches.service';
import { Coach, PaginationParams } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const useCoaches = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['coaches', params],
    queryFn: () => coachesService.getAll(params),
  });
};

export const useCoach = (id: string) => {
  return useQuery({
    queryKey: ['coaches', id],
    queryFn: () => coachesService.getById(id),
    enabled: !!id,
  });
};

export const useCreateCoach = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: Omit<Coach, 'id' | 'created_at' | 'updated_at'>) =>
      coachesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coaches'] });
      toast({
        title: 'نجح',
        description: 'تم إنشاء المدرب بنجاح',
      });
    },
    onError: (error) => {
      toast({
        title: 'خطأ',
        description: 'فشل في إنشاء المدرب',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateCoach = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Coach> }) =>
      coachesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coaches'] });
      toast({
        title: 'نجح',
        description: 'تم تحديث المدرب بنجاح',
      });
    },
    onError: (error) => {
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث المدرب',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteCoach = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => coachesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coaches'] });
      toast({
        title: 'نجح',
        description: 'تم حذف المدرب بنجاح',
      });
    },
    onError: (error) => {
      toast({
        title: 'خطأ',
        description: 'فشل في حذف المدرب',
        variant: 'destructive',
      });
    },
  });
};

export const useBulkDeleteCoaches = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (ids: string[]) => coachesService.bulkDelete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coaches'] });
      toast({
        title: 'نجح',
        description: 'تم حذف المدربين بنجاح',
      });
    },
    onError: (error) => {
      toast({
        title: 'خطأ',
        description: 'فشل في حذف المدربين',
        variant: 'destructive',
      });
    },
  });
};
