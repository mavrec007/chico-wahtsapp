
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { facilitiesService } from '@/services/facilities.service';
import { Facility, PaginationParams } from '@/types';
import { toast } from 'sonner';

export const useFacilities = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['facilities', params],
    queryFn: () => facilitiesService.getAll(params),
  });
};

export const useFacility = (id: string) => {
  return useQuery({
    queryKey: ['facility', id],
    queryFn: () => facilitiesService.getById(id),
    enabled: !!id,
  });
};

export const useCreateFacility = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<Facility, 'id' | 'created_at' | 'updated_at'>) =>
      facilitiesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
      toast.success('تم إنشاء المرفق بنجاح');
    },
    onError: (error) => {
      toast.error('فشل في إنشاء المرفق');
      console.error('Error creating facility:', error);
    },
  });
};

export const useUpdateFacility = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Facility> }) =>
      facilitiesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
      toast.success('تم تحديث المرفق بنجاح');
    },
    onError: (error) => {
      toast.error('فشل في تحديث المرفق');
      console.error('Error updating facility:', error);
    },
  });
};

export const useDeleteFacility = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => facilitiesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
      toast.success('تم حذف المرفق بنجاح');
    },
    onError: (error) => {
      toast.error('فشل في حذف المرفق');
      console.error('Error deleting facility:', error);
    },
  });
};

export const useAvailableFacilities = (startTime: string, endTime: string) => {
  return useQuery({
    queryKey: ['facilities', 'available', startTime, endTime],
    queryFn: () => facilitiesService.getAvailableFacilities(startTime, endTime),
    enabled: !!startTime && !!endTime,
  });
};
