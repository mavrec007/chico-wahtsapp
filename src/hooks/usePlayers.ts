
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { playersService } from '@/services/players.service';
import { Player, PaginationParams } from '@/types';
import { toast } from 'sonner';

export const usePlayers = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['players', params],
    queryFn: () => playersService.getAll(params),
  });
};

export const usePlayer = (id: string) => {
  return useQuery({
    queryKey: ['player', id],
    queryFn: () => playersService.getById(id),
    enabled: !!id,
  });
};

export const useCreatePlayer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<Player, 'id' | 'created_at' | 'updated_at'>) =>
      playersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      toast.success('تم إنشاء اللاعب بنجاح');
    },
    onError: (error) => {
      toast.error('فشل في إنشاء اللاعب');
      console.error('Error creating player:', error);
    },
  });
};

export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Player> }) =>
      playersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      toast.success('تم تحديث اللاعب بنجاح');
    },
    onError: (error) => {
      toast.error('فشل في تحديث اللاعب');
      console.error('Error updating player:', error);
    },
  });
};

export const useDeletePlayer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => playersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      toast.success('تم حذف اللاعب بنجاح');
    },
    onError: (error) => {
      toast.error('فشل في حذف اللاعب');
      console.error('Error deleting player:', error);
    },
  });
};

export const usePlayersByTeam = (team: string) => {
  return useQuery({
    queryKey: ['players', 'team', team],
    queryFn: () => playersService.getPlayersByTeam(team),
    enabled: !!team,
  });
};
