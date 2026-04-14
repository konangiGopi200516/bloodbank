export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  bloodType: string;
  age: number;
  city: string;
  state: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  bloodType: string;
  role: string;
}

export interface OTPRequest {
  contact: string;
  type: 'email' | 'mobile';
}

export interface OTPVerifyRequest {
  contact: string;
  type: 'email' | 'mobile';
  otp: string;
}

export interface OTPResponse {
  message: string;
  otp?: string; // Only for development
}

// Mock database for demo purposes
const mockUsers: AuthResponse[] = [
  {
    token: 'demo-token-123',
    type: 'Bearer',
    id: 1,
    email: 'demo@bloodconnect.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 (555) 123-4567',
    bloodType: 'O+',
    role: 'user'
  },
  {
    token: 'admin-token-456',
    type: 'Bearer',
    id: 2,
    email: 'admin@bloodconnect.com',
    firstName: 'Admin',
    lastName: 'User',
    phone: '+1 (555) 987-6543',
    bloodType: 'A+',
    role: 'admin'
  }
];

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await fetch('http://localhost:9999/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const user = await response.json();
      
      // Store token and user data
      localStorage.setItem('bloodconnect_token', user.token);
      localStorage.setItem('bloodconnect_user', JSON.stringify({
        id: user.id.toString(),
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
        bloodType: user.bloodType,
        avatar: ''
      }));
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  signup: async (userData: SignupRequest): Promise<{ message: string }> => {
    try {
      const response = await fetch('http://localhost:9999/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('bloodconnect_token');
    localStorage.removeItem('bloodconnect_user');
  },

  validateToken: async (): Promise<AuthResponse | null> => {
    try {
      const token = localStorage.getItem('bloodconnect_token');
      if (!token) return null;

      const response = await fetch('http://localhost:9999/api/auth/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Token is invalid, remove it
        localStorage.removeItem('bloodconnect_token');
        localStorage.removeItem('bloodconnect_user');
        return null;
      }

      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Token validation error:', error);
      // On error, clear invalid token
      localStorage.removeItem('bloodconnect_token');
      localStorage.removeItem('bloodconnect_user');
      return null;
    }
  },

  getCurrentUser: () => {
    const userData = localStorage.getItem('bloodconnect_user');
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('bloodconnect_token');
  },

  // OTP Service Methods
  sendOTP: async (otpRequest: OTPRequest): Promise<OTPResponse> => {
    try {
      console.log('Sending OTP request:', otpRequest);
      
      const response = await fetch('http://localhost:9999/api/otp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(otpRequest),
      });

      console.log('OTP response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OTP error response:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || 'Failed to send OTP' };
        }
        
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log('OTP success response:', result);
      return result;
    } catch (error) {
      console.error('Send OTP error:', error);
      
      if (error instanceof TypeError) {
        throw new Error('Network error: Unable to connect to server. Please check if the backend is running.');
      }
      
      throw error;
    }
  },

  verifyOTP: async (verifyRequest: OTPVerifyRequest): Promise<{ token: AuthResponse; message: string }> => {
    try {
      console.log('Verifying OTP request:', verifyRequest);
      
      const response = await fetch('http://localhost:9999/api/otp/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verifyRequest),
      });

      console.log('Verify OTP response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Verify OTP error response:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || 'Failed to verify OTP' };
        }
        
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Verify OTP success response:', data);
      
      // Store token and user data
      localStorage.setItem('bloodconnect_token', data.token.token);
      localStorage.setItem('bloodconnect_user', JSON.stringify({
        id: data.token.id.toString(),
        name: `${data.token.firstName} ${data.token.lastName}`,
        email: data.token.email,
        phone: data.token.phone,
        bloodType: data.token.bloodType,
        avatar: ''
      }));

      return data;
    } catch (error) {
      console.error('Verify OTP error:', error);
      
      if (error instanceof TypeError) {
        throw new Error('Network error: Unable to connect to server. Please check if the backend is running.');
      }
      
      throw error;
    }
  }
};