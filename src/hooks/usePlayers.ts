
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { playersService } from '@/services/players.service';
import { Player, PaginationParams } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const usePlayers = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['players', params],
    queryFn: () => playersService.getAll(params),
  });
};

export const usePlayer = (id: string) => {
  return useQuery({
    queryKey: ['players', id],
    queryFn: () => playersService.getById(id),
    enabled: !!id,
  });
};

export const useCreatePlayer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: Omit<Player, 'id' | 'created_at' | 'updated_at'>) =>
      playersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      toast({
        title: 'نجح',
        description: 'تم إنشاء اللاعب بنجاح',
      });
    },
    onError: (error) => {
      toast({
        title: 'خطأ',
        description: 'فشل في إنشاء اللاعب',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Player> }) =>
      playersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      toast({
        title: 'نجح',
        description: 'تم تحديث اللاعب بنجاح',
      });
    },
    onError: (error) => {
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث اللاعب',
        variant: 'destructive',
      });
    },
  });
};

export const useDeletePlayer = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => playersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      toast({
        title: 'نجح',
        description: 'تم حذف اللاعب بنجاح',
      });
    },
    onError: (error) => {
      toast({
        title: 'خطأ',
        description: 'فشل في حذف اللاعب',
        variant: 'destructive',
      });
    },
  });
};

export const useBulkDeletePlayers = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (ids: string[]) => playersService.bulkDelete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      toast({
        title: 'نجح',
        description: 'تم حذف اللاعبين بنجاح',
      });
    },
    onError: (error) => {
      toast({
        title: 'خطأ',
        description: 'فشل في حذف اللاعبين',
        variant: 'destructive',
      });
    },
  });
};
