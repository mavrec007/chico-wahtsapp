
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coachAssignmentsService } from '@/services/coach-assignments.service';
import { CoachAssignment, PaginationParams } from '@/types';
import { toast } from 'sonner';

export const useCoachAssignments = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['coach-assignments', params],
    queryFn: () => coachAssignmentsService.getAll(params),
  });
};

export const useCoachAssignment = (id: string) => {
  return useQuery({
    queryKey: ['coach-assignment', id],
    queryFn: () => coachAssignmentsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateCoachAssignment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<CoachAssignment, 'id' | 'created_at' | 'updated_at'>) =>
      coachAssignmentsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coach-assignments'] });
      toast.success('تم إنشاء التكليف بنجاح');
    },
    onError: (error) => {
      toast.error('فشل في إنشاء التكليف');
      console.error('Error creating coach assignment:', error);
    },
  });
};

export const useUpdateCoachAssignment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CoachAssignment> }) =>
      coachAssignmentsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coach-assignments'] });
      toast.success('تم تحديث التكليف بنجاح');
    },
    onError: (error) => {
      toast.error('فشل في تحديث التكليف');
      console.error('Error updating coach assignment:', error);
    },
  });
};

export const useDeleteCoachAssignment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => coachAssignmentsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coach-assignments'] });
      toast.success('تم حذف التكليف بنجاح');
    },
    onError: (error) => {
      toast.error('فشل في حذف التكليف');
      console.error('Error deleting coach assignment:', error);
    },
  });
};

export const useAssignmentsByCoach = (coachId: string) => {
  return useQuery({
    queryKey: ['coach-assignments', 'coach', coachId],
    queryFn: () => coachAssignmentsService.getAssignmentsByCoach(coachId),
    enabled: !!coachId,
  });
};

export const useAssignmentsByPlayer = (playerId: string) => {
  return useQuery({
    queryKey: ['coach-assignments', 'player', playerId],
    queryFn: () => coachAssignmentsService.getAssignmentsByPlayer(playerId),
    enabled: !!playerId,
  });
};
