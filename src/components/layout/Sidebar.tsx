
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  PieChart,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AnimatedTransition } from '@/components/ui-elements/AnimatedTransition';

interface SidebarProps {
  className?: string;
}

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    title: 'Carteira',
    icon: PieChart,
    path: '/portfolio',
  },
  {
    title: 'Transações',
    icon: History,
    path: '/transactions',
  },
  {
    title: 'Configurações',
    icon: Settings,
    path: '/settings',
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      {/* Mobile Menu Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu />
      </Button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" 
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AnimatedTransition 
        isVisible={true} 
        variant="slide"
        className={cn(
          'fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out',
          collapsed ? 'w-[70px]' : 'w-[280px]',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          'bg-sidebar border-r border-sidebar-border',
          'flex flex-col',
          className
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <div className={cn('overflow-hidden transition-all duration-300', collapsed && 'w-0')}>
            <h1 className="text-xl font-semibold text-sidebar-foreground">Investo Simples</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center px-3 py-2.5 rounded-lg group transition-all',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50',
                    collapsed && 'justify-center'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className={cn('flex-shrink-0 w-5 h-5', isActive && 'text-sidebar-primary')} />
                  <span className={cn('ml-3 transition-all duration-300', collapsed && 'w-0 overflow-hidden')}>
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <div className={cn(
            'flex items-center', 
            collapsed ? 'justify-center' : 'justify-between',
            'transition-all duration-300'
          )}>
            <div className={cn('flex items-center overflow-hidden', collapsed && 'w-0')}>
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.photoURL} />
                <AvatarFallback className="text-xs bg-sidebar-primary text-sidebar-primary-foreground">
                  {user.name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className={cn('ml-3 transition-all duration-300', collapsed && 'w-0 overflow-hidden')}>
                <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/70">{user.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={cn('text-sidebar-foreground hover:text-sidebar-foreground/80', !collapsed && 'ml-2')}
              onClick={logout}
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </AnimatedTransition>
    </>
  );
};

export default Sidebar;
