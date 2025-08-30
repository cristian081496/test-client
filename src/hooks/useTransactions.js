import { useQuery } from '@tanstack/react-query';
import { transactionApi } from '../services/api';

export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await transactionApi.getTransactions();
      return response.data;
    },
  });
};

export const useUserTransactions = (userId) => {
  return useQuery({
    queryKey: ['transactions', 'user', userId],
    queryFn: async () => {
      const response = await transactionApi.getTransactionsByUserId(userId);
      return response.data;
    },
    enabled: !!userId,
  });
};