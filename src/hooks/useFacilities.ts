
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { facilitiesService } from '@/services/facilities.service';
import { Facility, PaginationParams } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const useFacilities = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['facilities', params],
    queryFn: () => facilitiesService.getAll(params),
  });
};

export const useFacility = (id: string) => {
  return useQuery({
    queryKey: ['facilities', id],
    queryFn: () => facilitiesService.getById(id),
    enabled: !!id,
  });
};

export const useCreateFacility = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: Omit<Facility, 'id' | 'created_at' | 'updated_at'>) =>
      facilitiesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
      toast({
        title: 'نجح',
        description: 'تم إنشاء المرفق بنجاح',
      });
    },
    onError: (error) => {
      toast({
        title: 'خطأ',
        description: 'فشل في إنشاء المرفق',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateFacility = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Facility> }) =>
      facilitiesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
      toast({
        title: 'نجح',
        description: 'تم تحديث المرفق بنجاح',
      });
    },
    onError: (error) => {
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث المرفق',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteFacility = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => facilitiesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
      toast({
        title: 'نجح',
        description: 'تم حذف المرفق بنجاح',
      });
    },
    onError: (error) => {
      toast({
        title: 'خطأ',
        description: 'فشل في حذف المرفق',
        variant: 'destructive',
      });
    },
  });
};

export const useBulkDeleteFacilities = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (ids: string[]) => facilitiesService.bulkDelete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
      toast({
        title: 'نجح',
        description: 'تم حذف المرافق بنجاح',
      });
    },
    onError: (error) => {
      toast({
        title: 'خطأ',
        description: 'فشل في حذف المرافق',
        variant: 'destructive',
      });
    },
  });
};
