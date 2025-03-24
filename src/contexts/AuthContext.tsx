
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Define user type
export interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  googleLogin: () => Promise<void>;
}

// Create auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  forgotPassword: async () => {},
  googleLogin: async () => {},
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock authentication for now - will be replaced with real auth
  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock login - will be replaced with real auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any valid email and password works
      const mockUser: User = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success('Login bem-sucedido!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Falha no login. Verifique suas credenciais.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // Mock registration - will be replaced with real auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        email,
        name,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success('Conta criada com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Falha no registro. Tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      // Mock logout - will be replaced with real auth
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      localStorage.removeItem('user');
      toast.success('Você saiu da sua conta');
      navigate('/login');
    } catch (error) {
      toast.error('Erro ao sair. Tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Forgot password function
  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      // Mock forgot password - will be replaced with real auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('E-mail de recuperação enviado!');
      navigate('/login');
    } catch (error) {
      toast.error('Falha ao enviar e-mail de recuperação.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Google login function
  const googleLogin = async () => {
    setLoading(true);
    try {
      // Mock Google login - will be replaced with real auth
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        email: 'usuario.google@gmail.com',
        name: 'Usuário Google',
        photoURL: 'https://ui-avatars.com/api/?name=Usuário+Google&background=0D8ABC&color=fff',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success('Login com Google bem-sucedido!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Falha no login com Google.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    forgotPassword,
    googleLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
