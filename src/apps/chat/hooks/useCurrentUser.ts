import { useAppSelector } from '../store';

export function useCurrentUser() {
  return useAppSelector((state) => state.auth.user);
}
