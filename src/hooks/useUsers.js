import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi, uploadApi } from '../services/api';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await userApi.getUsers();
      return response.data;
    },
  });
};

export const useUser = (id) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await userApi.getUserById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useUploadZip = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: uploadApi.uploadZip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
};