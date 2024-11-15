import { User } from '../types';

export const Permissions = {
  roles: {
    admin: ['manage_users', 'manage_finances', 'manage_appointments', 'view_reports'],
    professional: ['view_appointments', 'manage_own_appointments', 'view_clients'],
    client: ['view_own_appointments', 'book_appointments']
  },

  can(user: User, action: string): boolean {
    if (!user || !user.role) return false;
    return this.roles[user.role].includes(action);
  },

  canManageUsers(user: User): boolean {
    return this.can(user, 'manage_users');
  },

  canManageFinances(user: User): boolean {
    return this.can(user, 'manage_finances');
  },

  canViewReports(user: User): boolean {
    return this.can(user, 'view_reports');
  }
}; 