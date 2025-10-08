// Mock authentication and storage service using localStorage
interface User {
  id: string;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  notificationPreferences: {
    billUpdates: boolean;
    paymentReminders: boolean;
    propertyChanges: boolean;
    generalAnnouncements: boolean;
  };
}

class LocalStorageAuth {
  private readonly USERS_KEY = 'users';
  private readonly CURRENT_USER_KEY = 'currentUser';

  constructor() {
    // Initialize demo user
    const demoUser = {
      id: '1',
      email: 'demo@example.com',
      password: 'demo1234',
      firstName: 'Demo',
      lastName: 'User',
      notificationPreferences: {
        billUpdates: true,
        paymentReminders: true,
        propertyChanges: true,
        generalAnnouncements: true
      }
    };

    // Always ensure demo user exists and is up to date
    const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    const demoIndex = users.findIndex((u: any) => u.email === demoUser.email);
    
    if (demoIndex >= 0) {
      users[demoIndex] = demoUser;
    } else {
      users.push(demoUser);
    }
    
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  async signUp({ email, password, options }: { 
    email: string; 
    password: string; 
    options?: { 
      data?: any 
    } 
  }) {
    const users = this.getUsers();
    const isPhone = /^\+?[1-9]\d{1,14}$/.test(email);
    
    // Check if user exists by email or phone
    if (users.find(u => (isPhone ? u.phone === email : u.email === email))) {
      return { error: { message: 'User already exists' } };
    }

    const newUser = {
      id: crypto.randomUUID(),
      [isPhone ? 'phone' : 'email']: email,
      password,
      ...options?.data,
      notificationPreferences: options?.data?.notificationPreferences || {
        billUpdates: true,
        paymentReminders: true,
        propertyChanges: true,
        generalAnnouncements: true
      }
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    return { data: { user: userWithoutPassword }, error: null };
  }

  async signInWithPassword({ email, password }: { email: string; password: string }) {
    const users = this.getUsers();
    const isPhone = /^\+?[1-9]\d{1,14}$/.test(email);
    
    const user = users.find(u => 
      (isPhone ? u.phone === email : u.email === email) && 
      u.password === password
    );

    if (!user) {
      return { error: { message: 'Invalid credentials' } };
    }

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    // Dispatch a custom event to notify about auth state change
    window.dispatchEvent(new CustomEvent('authStateChange', { 
      detail: { user: userWithoutPassword } 
    }));

    return { data: { user: userWithoutPassword }, error: null };
  }

  async signInWithSocial(provider: 'google' | 'facebook') {
    // Mock social login - create a user with provider email
    const email = `user@${provider}.com`;
    const users = this.getUsers();
    let user = users.find(u => u.email === email);

    if (!user) {
      user = {
        id: crypto.randomUUID(),
        email,
        password: crypto.randomUUID(),
        firstName: provider === 'google' ? 'Google' : 'Facebook',
        lastName: 'User',
        notificationPreferences: {
          billUpdates: true,
          paymentReminders: true,
          propertyChanges: true,
          generalAnnouncements: true
        }
      };
      users.push(user);
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    return { data: { user: userWithoutPassword }, error: null };
  }

  async resetPassword(email: string) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return { error: { message: 'User not found' } };
    }

    // In a real app, this would send an email
    console.log('Password reset email sent to:', email);

    return { error: null };
  }

  async signOut() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    
    // Dispatch a custom event to notify about auth state change
    window.dispatchEvent(new CustomEvent('authStateChange', { 
      detail: { user: null } 
    }));
    
    return { error: null };
  }

  async updateUser({ notificationPreferences }: { notificationPreferences?: User['notificationPreferences'] }) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { error: { message: 'No user logged in' } };
    }

    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) {
      return { error: { message: 'User not found' } };
    }

    const updatedUser = { 
      ...users[userIndex],
      notificationPreferences: {
        ...users[userIndex].notificationPreferences,
        ...notificationPreferences
      }
    };
    users[userIndex] = updatedUser;
    
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = updatedUser;
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    return { data: { user: userWithoutPassword }, error: null };
  }

  private getUsers(): (User & { password: string })[] {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}

export const auth = new LocalStorageAuth();