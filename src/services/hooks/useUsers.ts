import { useQuery } from 'react-query';
import { api } from '../api';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type Data = {
  users: User[];
};

async function getUsers(): Promise<User[]> {
  const { data: userData } = await api.get<Data>('users');

  const users = userData.users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }));

  return users;
}

export function useUsers() {
  return useQuery('users', getUsers, {
    staleTime: 1000 * 5
  });
}
