
export interface UserType {
  id: number;
  name: string;
  description?: string;
  permission_level: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  user_type_id?: number;
  user_type?: UserType;
}

export interface Role {
  id: number;
  name: string;
}

export interface MaterialStatus {
  id: number;
  name: string;
  description?: string;
}

export interface Supplier {
  id: number;
  name: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface Manufacturer {
  id: number;
  name: string;
  country?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Material {
  id: number;
  name: string;
  description?: string;
  serial_number?: string;
  quantity: number;
  available: boolean;
  purchase_date?: string;
  purchase_price?: number;
  category_id?: number;
  status_id?: number;
  supplier_id?: number;
  manufacturer_id?: number;
  category?: Category;
  status?: MaterialStatus;
  supplier?: Supplier;
  manufacturer?: Manufacturer;
}

export interface BorrowRequest {
  id: number;
  user_id: number;
  material_id: number;
  request_date: string;
  start_date?: string;
  end_date?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'RETURNED';
  purpose?: string;
  comments?: string;
  user?: User;
  material?: Material;
}

export interface MaintenanceRecord {
  id: number;
  material_id: number;
  technician_id: number;
  maintenance_date: string;
  maintenance_type: string;
  description?: string;
  cost?: number;
  completed: boolean;
  material?: Material;
  technician?: User;
}
