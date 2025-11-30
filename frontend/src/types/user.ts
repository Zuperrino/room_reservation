export interface UserRead {
  id: number;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
}

export interface UserCreate {
  email: string;
  password: string;
  is_active?: boolean;
  is_superuser?: boolean;
  is_verified?: boolean;
}

export interface UserUpdate {
  email?: string;
  password?: string;
  is_active?: boolean;
  is_superuser?: boolean;
  is_verified?: boolean;
}

