export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  notificationPreferences: {
    billUpdates: boolean;
    paymentReminders: boolean;
    propertyChanges: boolean;
    generalAnnouncements: boolean;
  };
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}