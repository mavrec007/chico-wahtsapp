
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentsService } from '@/services/payments.service';
import { Payment, PaginationParams } from '@/types';
import { toast } from 'sonner';

export const usePayments = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['payments', params],
    queryFn: () => paymentsService.getAll(params),
  });
};

export const usePayment = (id: string) => {
  return useQuery({
    queryKey: ['payment', id],
    queryFn: () => paymentsService.getById(id),
    enabled: !!id,
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<Payment, 'id' | 'created_at' | 'updated_at'>) =>
      paymentsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success('تم إنشاء الدفعة بنجاح');
    },
    onError: (error) => {
      toast.error('فشل في إنشاء الدفعة');
      console.error('Error creating payment:', error);
    },
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Payment> }) =>
      paymentsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success('تم تحديث الدفعة بنجاح');
    },
    onError: (error) => {
      toast.error('فشل في تحديث الدفعة');
      console.error('Error updating payment:', error);
    },
  });
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => paymentsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success('تم حذف الدفعة بنجاح');
    },
    onError: (error) => {
      toast.error('فشل في حذف الدفعة');
      console.error('Error deleting payment:', error);
    },
  });
};

export const usePaymentsByBooking = (bookingId: string) => {
  return useQuery({
    queryKey: ['payments', 'booking', bookingId],
    queryFn: () => paymentsService.getPaymentsByBooking(bookingId),
    enabled: !!bookingId,
  });
};

export const useConfirmPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, confirmedBy }: { id: string; confirmedBy: string }) =>
      paymentsService.confirmPayment(id, confirmedBy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success('تم تأكيد الدفعة بنجاح');
    },
    onError: (error) => {
      toast.error('فشل في تأكيد الدفعة');
      console.error('Error confirming payment:', error);
    },
  });
};
