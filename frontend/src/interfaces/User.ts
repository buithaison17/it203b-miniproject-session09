export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  status: "active" | "inactive" | "block";
  created_at: Date;
  updated_at: Date;
}

export interface Roles {
  id: string;
  name: "User" | "Admin";
}

export interface UserRole {
  userId: string;
  roleId: string;
}
