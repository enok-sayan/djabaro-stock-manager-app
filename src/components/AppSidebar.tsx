
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Package,
  Users,
  MapPin,
  UserCheck,
  Truck,
  PackageOpen,
  BarChart3,
  Send,
  Building,
  FileText,
  Database,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard, roles: ['Admin', 'Employé', 'Manager', 'Client'] },
  { title: 'Catégories', url: '/categories', icon: Package, roles: ['Admin', 'Employé', 'Manager'] },
  { title: 'Utilisateurs', url: '/utilisateurs', icon: Users, roles: ['Admin'] },
  { title: 'Emplacements', url: '/emplacements', icon: MapPin, roles: ['Admin', 'Employé', 'Manager'] },
  { title: 'Clients', url: '/clients', icon: UserCheck, roles: ['Admin', 'Employé', 'Manager'] },
  { title: 'Fournisseurs', url: '/fournisseurs', icon: Truck, roles: ['Admin', 'Employé', 'Manager'] },
  { title: 'Réceptions', url: '/receptions', icon: PackageOpen, roles: ['Admin', 'Employé'] },
  { title: 'État de stock', url: '/stock', icon: BarChart3, roles: ['Admin', 'Employé', 'Manager'] },
  { title: 'Expédition', url: '/expedition', icon: Send, roles: ['Admin', 'Employé'] },
  { title: 'Société', url: '/societe', icon: Building, roles: ['Admin'] },
  { title: 'Rapport', url: '/rapport', icon: FileText, roles: ['Admin', 'Manager'] },
  { title: 'Sauvegarde BD', url: '/sauvegarde', icon: Database, roles: ['Admin'] },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const { user, logout } = useAuth();
  const currentPath = location.pathname;

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-accent/50 text-gray-700 hover:text-primary";

  const filteredItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center flex-shrink-0">
            <img 
              src="/lovable-uploads/2630b39e-9636-44b1-92e2-016af12eb9e9.png" 
              alt="Djabaro" 
              className="w-6 h-6 object-contain filter brightness-0 invert"
            />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-primary">DJABARO</h2>
              <p className="text-xs text-gray-500">Gestion de Stock</p>
            </div>
          )}
        </div>
        {!collapsed && user && (
          <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
            <p className="font-medium text-gray-800">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-gray-600">{user.role}</p>
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Logout button */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="ml-3">Déconnexion</span>}
        </Button>
      </div>

      {/* Trigger for collapsing */}
      <SidebarTrigger className="absolute -right-3 top-6 bg-white border border-gray-200 shadow-sm" />
    </Sidebar>
  );
}
